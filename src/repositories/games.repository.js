import db from '../database/connection.js';
import gameQuery from '../helpers/gameQueryConstructor.js';

class GamesRepository
{
	list( name, limit, offset, order, desc ){
		const {query, params} = gameQuery( name, limit, offset, order, desc );
		return db.query( `${query};`, params );
	}

	listById( id ){
		const query = {
			text: 'SELECT * FROM games WHERE id = $1;',
			values: [`${id}`],
		};
		return db.query( query );
	}
	
	create( name, image, stockTotal, pricePerDay ){
		return db.query( `
			INSERT INTO games (name, image, "stockTotal", "pricePerDay")
			VALUES ($1, $2, $3, $4);
		`, [name, image, stockTotal, pricePerDay] );
	}
}

export default new GamesRepository;