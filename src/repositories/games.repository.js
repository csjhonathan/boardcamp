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
		return db.query( 'SELECT * FROM games' );
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

	update( movement, id ){
		return db.query( `
			UPDATE games SET "stockTotal" = "stockTotal" + $1 WHERE id = $2;
		`,[movement, id] );
	}
}

export default new GamesRepository;