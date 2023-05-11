import CustomersRepository from '../repositories/customers.repository.js';
export default function customersValidation( shcema ){
	return async ( req, res, next ) => {
		const {id} = req.params;
		const {error, value} = shcema.validate( req.body, {abortEarly : false} );
		if( error ) return res.status( 400 ).send( {message : error.details.map( er => er.message )} );

		try {

			const {rows : [customer]} = await CustomersRepository.list( value.cpf );
			
			if( id && !isNaN( id ) ){

				if( !customer ){
					res.locals.customer = req.body;
					return next();
				}
				const {rows : [customerById]} = await CustomersRepository.listById( id );
				if( !customerById ){
					return res.status( 409 ).send( {message : 'Id inexistente!'} );
				}else if( customer.id !== Number( id ) ){
					return res.status( 409 ).send( {message : 'CPF indisponível!'} );
				}else{
					res.locals.customer = req.body;
					return next();
				}
			}else if( id && isNaN( id ) ) return res.status( 422 ).send( {message : 'Id inválido!'} );

			if( customer ) return res.status( 409 ).send( {message : 'Usuário já está cadastrado!'} );

			res.locals.customer = req.body;
			next();
		} catch ( error ) {
			return res.status( 500 ).send( {message : error.message} );
		}

	};
}