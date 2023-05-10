import db from '../database/connection.js';

class GamesRepository
{
	list( name ){
		if( name ){
			const query = {
				text: 'SELECT * FROM games WHERE name ILIKE $1;',
				values: [`${name}%`],
			};
			return db.query( query );
		}
	}

	create( name, image, stockTotal, pricePerDay ){
		return db.query( `
			INSERT INTO games (name, image, "stockTotal", "pricePerDay")
			VALUES ($1, $2, $3, $4);
		`, [name, image, stockTotal, pricePerDay] );
	}
}

export default new GamesRepository;