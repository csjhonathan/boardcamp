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
			console.log( error.message );
			res.sendStatus( 500 );
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
			console.log( error.message );
			res.sendStatus( 500 );
		}
	}

	async listById( req, res ){
		const {id} = req.params;
		try {
			const {rows} = await CustomersRepository.listById( id );
			res.status( 200 ).send( {...rows[0], birthday : dayjs( rows[0].birthday ).format( 'YYYY-MM-DD' )} );
		} catch ( error ) {
			console.log( error.message );
			res.sendStatus( 500 );
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
			res.sendStatus( 500 );
		}
	}
}

export default new CustomersControllers;