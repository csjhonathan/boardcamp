import Joi from 'joi';

const customerSchema = Joi.object( {
	name : Joi
		.string()
		.required(), 
	phone : Joi
		.string()
		.pattern( /^[0-9]+$/ )
		.min( 10 )
		.max( 11 )
		.required()
		.messages( {
			'string.pattern.base': 'phone must contain only numbers'
		} ),  
	cpf : Joi
		.string()
		.pattern( /^[0-9]+$/ )
		.length( 11 )
		.required()
		.messages( {
			'string.pattern.base': 'cpf must contain only numbers'
		} ), 
	birthday : Joi
		.date()
		.required()
} );

export default customerSchema;