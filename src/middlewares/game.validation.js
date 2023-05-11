import GamesRepository from '../repositories/games.repository.js';
export default function gameValidation( shcema ){
	return async ( req, res, next ) => {
		const {error, value} = shcema.validate( req.body, {abortEarly : false} );
		
		if( error ) return res.status( 400 ).send( {message : error.details.map( er => er.message )} );

		try {
			const {rows : [game]} = await GamesRepository.list( value.name );
			if( game ) return res.status( 409 ).send( {message : 'Este jogo já está cadastrado!'} );
		} catch ( error ) {
			return res.status( 500 ).send( {message : error.message} );
		}

		res.locals.game = value;
		next();
	};
}