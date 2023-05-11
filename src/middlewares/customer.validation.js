import dayjs from 'dayjs';
import CustomersRepository from '../repositories/customers.repository.js';
export default function customersValidation( shcema ){
	return async ( req, res, next ) => {
		const {id} = req.params;
		const {error, value} = shcema.validate( req.body, {abortEarly : false} );
		if( error ) return res.status( 400 ).send( {message : error.details.map( er => er.message )} );

		try {

			if( id && !isNaN( id ) ){
				const {rows} = await CustomersRepository.listById( id );
				if( !rows.length ){
					return res.status( 409 ).send( {message : 'Id inexistente!'} );
				}else{
					res.locals.customer = req.body;
					return next();
				}
			}else if( id && isNaN( id ) ) return res.status( 422 ).send( {message : 'Id inválido!'} );

			const {rows} = await CustomersRepository.list( value.cpf );
			if( rows.length ) return res.status( 409 ).send( {message : 'Usuário já está cadastrado!'} );

			res.locals.customer = req.body;
			next();
		} catch ( error ) {
			console.log( error );
			return res.sendStatus( 500 );
		}

	};
}