import GamesRepository from '../repositories/games.repository.js';

class GamesControllers

{
	async list( req, res ){
		const {name} = req.query;
		try {
			const {rows} = await GamesRepository.list( name );
			console.table( rows );
			res.status( 200 ).send( rows );
		} catch ( error ) {
			console.log( error.message );
			res.sendStatus( 500 );
		}
	}
	async create( req, res ){
		const {name, image, stockTotal, pricePerDay} = res.locals.game;
		try {
			await GamesRepository.create( name, image, stockTotal, pricePerDay );
			res.sendStatus( 201 );
		} catch ( error ) {
			console.log( error.message );
			res.sendStatus( 500 );
		}
	}
}

export default new GamesControllers;