import GamesRepository from '../repositories/games.repository.js';

class GamesControllers
{
	async list( req, res ){
		const {name, limit, offset, order, desc} = req.query;
		try {
			const {rows} = await GamesRepository.list(
				name, 
				limit, 
				offset,
				order,
				desc 
			);
			res.status( 200 ).send( rows );
		} catch ( error ) {
			res.status( 500 ).send( {message : error.message} );
		}
	}
	
	async create( req, res ){
		const {name, image, stockTotal, pricePerDay} = res.locals.game;
		try {
			await GamesRepository.create( name, image, stockTotal, pricePerDay );
			res.sendStatus( 201 );
		} catch ( error ) {
			res.status( 500 ).send( {message : error.message} );
		}
	}
}

export default new GamesControllers;