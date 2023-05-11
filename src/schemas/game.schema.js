import Joi from 'joi';

const gameSchema = Joi.object( {
	name : Joi
		.string()
		.required(), 
	image : Joi
		.string()
		.uri()
		.required(),  
	stockTotal : Joi
		.number()
		.integer()
		.greater( 0 )
		.required(), 
	pricePerDay : Joi
		.number()
		.integer()
		.greater( 0 )
		.required()
} );

export default gameSchema;