import GamesRepository from '../repositories/games.repository.js';
export default function gameValidation( shcema ){
	return async ( req, res, next ) => {
		const {error, value} = shcema.validate( req.body, {abortEarly : false} );
		
		if( error ) return res.status( 400 ).send( {message : error.details.map( er => er.message )} );

		try {
			const {rows} = await GamesRepository.list( value.name );
			if( rows.length ) return res.status( 409 ).send( {message : 'Este jogo já está cadastrado!'} );
		} catch ( error ) {
			return res.sendStatus( 500 );
		}

		res.locals.game = value;
		next();
	};
}