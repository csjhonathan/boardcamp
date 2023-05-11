import db from '../database/connection.js';

class GamesRepository
{
	list( name, limit, offset, order, desc ){
		const params = [];
		let query = ' SELECT * FROM games WHERE 1=1';

		if( name ){
			params.push( `${name}%` );
			query += ` AND name ILIKE $${params.length}`;
		}

		if ( order ) {
			query += ` ORDER BY "${order}" ${desc ? 'DESC' : 'ASC'}`;
		}
		
		if ( limit ) {
			params.push( limit );
			query += ` LIMIT $${params.length}`;
		}
		
		if ( offset ) {
			params.push( offset );
			query += ` OFFSET $${params.length}`;
		}
		
		

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

	update( movement, id ){
		return db.query( `
			UPDATE games SET "stockTotal" = "stockTotal" + $1 WHERE id = $2;
		`,[movement, id] );
	}
}

export default new GamesRepository;