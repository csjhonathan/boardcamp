import CustomersRepository from '../repositories/customers.repository.js';
import dayjs from 'dayjs';
class CustomersControllers
{
	async create( req, res ){
		const {name, phone, cpf, birthday} = res.locals.customer;
		try {

			await CustomersRepository.create( name, phone, cpf, birthday );
			res.sendStatus( 201 );
		} catch ( error ) {
			res.status( 500 ).send( {message : error.message} );
		}
	}

	async list( req, res ){
		const {cpf} = req.query;
		try {
			const {rows} = await CustomersRepository.list( cpf );
			res.status( 200 ).send( rows.map( customer => {
				return  {...customer, birthday : dayjs( customer.birthday ).format( 'YYYY-MM-DD' )};
			} ) );
		} catch ( error ) {
			res.status( 500 ).send( {message : error.message} );
		}
	}

	async listById( req, res ){
		const {id} = req.params;
		if( isNaN( id ) ) return res.status( 404 ).send( {message : 'Usuário não encontrado'} );
		try {
			const {rows} = await CustomersRepository.listById( id );
			if( !rows.length ) return res.status( 404 ).send( {message : 'Usuário não encontrado'} );
			res.status( 200 ).send( {...rows[0], birthday : dayjs( rows[0].birthday ).format( 'YYYY-MM-DD' )} );
		} catch ( error ) {
			console.log( error.message );
			res.status( 500 ).send( {message : error.message} );
		}
	}

	async update( req, res ){
		const {name, phone, cpf, birthday} = res.locals.customer;
		const {id} = req.params;

		if( isNaN( id ) ) return res.status( 422 ).send( {message : 'Id inválido!'} );
		
		try {
			await CustomersRepository.update( id , name, phone, cpf, birthday );
			res.sendStatus( 200 );
		} catch ( error ) {
			console.log( error.message );
			res.status( 500 ).send( {message : error.message} );
		}
	}
}

export default new CustomersControllers;