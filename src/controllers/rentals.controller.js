import GamesRepository from '../repositories/games.repository.js';
import CustomersRepository from '../repositories/customers.repository.js';
import RentalsRepository from '../repositories/rentals.repository.js';
import dayjs from 'dayjs';
import rentalsFormater from '../helpers/rentalsFormater.js';
class RentalsController
{
	async create( req,res ){
		const {customerId, gameId, daysRented} = req.body;

		if( isNaN( customerId ) || isNaN( gameId ) || isNaN( daysRented ) ){
			return res.status( 400 ).send( {message : 'Todos os campos devem ser apenas números inteiros!'} );
		}
		if( daysRented <= 0 ) return res.status( 400 ).send( {message : 'A quantidade de dias alugado deve ser maior que 0!'} );
		try {

			const {rows : [customer]} = await CustomersRepository.listById( customerId );
			const {rows : [game]} = await GamesRepository.listById( gameId );
			if( !customer || !game ){
				return res.status( 400 ).send( {message : 'Jogo ou usuário não encontrado!'} );
			}

			if( game.stockTotal == 0 ) {
				return res.status( 400 ).send( {message : 'Jogo indisponível para aluguel!'} );
			}

			await RentalsRepository.create( 
				customerId, 
				gameId, 
				dayjs( Date.now() ).format( 'YYYY-MM-DD' ),
				daysRented,
				null,
				daysRented * game.pricePerDay,
				null
			);
			
			await GamesRepository.update( -1, gameId );

			res.sendStatus( 201 );

		} catch ( error ) {
			res.status( 500 ).send( {message:error.message} );
		}
	}

	async list( req, res ){
		const {customerId, gameId, offset, limit, order, desc,  status, startDate} = req.query;
		
		try {

			const {rows} = await RentalsRepository.list( 
				customerId, 
				gameId, 
				offset, 
				limit,
				order,
				desc,
				status, 
				startDate
			);
			
			const formatedRentals = rentalsFormater( rows );
			console.table( formatedRentals );
			res.status( 200 ).send( formatedRentals );
		} catch ( error ) {
			res.status( 500 ).send( {message:error.message} );
		}
	}

	async delete( req, res ){
		const {id} = req.params;
		if( isNaN( id ) ) return res.status( 404 ).send( {message : 'Id inválido!'} );
		try {
			
			const {rows : [rental]} = await RentalsRepository.listByRentalId( id );
			if( !rental ){
				return res.status( 404 ).send( {message : 'Aluguel não encontrado!'} );
			}

			if( !rental.returnDate ) {
				return res.status( 400 ).send( {message : 'Não foi possível deletar pois o aluguel está em aberto!'} );
			}

			await RentalsRepository.delete( id );

			res.sendStatus( 200 );

		} catch ( error ) {
			res.status( 500 ).send( {message:error.message} );
		}
	}

	async update( req, res ){
		const {id} = req.params;
		if( isNaN( id ) ) return res.status( 404 ).send( {message : 'Id inválido!'} );
		try {

			const {rows : [rental]} = await RentalsRepository.listByRentalId( id );
			if( !rental ){
				return res.status( 404 ).send( {message : 'Aluguel não encontrado!'} );
			}
			if( rental.returnDate ) {
				return res.status( 400 ).send( {message : 'Não foi possível devolver pois o aluguel já está fechado!'} );
			}

			let delayFee = null;
			
			if( dayjs( Date.now() ).diff( rental.rentDate, 'day' ) > rental.daysRented ){

				const pricePerDay = rental.originalPrice / rental.daysRented;
				const delay = Math.abs( dayjs( Date.now() ).diff( rental.rentDate, 'day' ) - rental.daysRented );

				delayFee = delay * pricePerDay;
			}

			await RentalsRepository.update( id,  dayjs( Date.now() ).format( 'YYYY-MM-DD' ), delayFee );
			await GamesRepository.update( 1, rental.gameId );
			res.sendStatus( 200 );
		} catch ( error ) {
			res.status( 500 ).send( {message:error.message} );
		}
	}
}

export default new RentalsController;