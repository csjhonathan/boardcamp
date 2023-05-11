import db from '../database/connection.js';
import dayjs from 'dayjs';
class RentalsRepository
{
	create( costumerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee ){
		return db.query( `
    INSERT INTO rentals ( "customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee" )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,[ costumerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee] );
	}

	list( customerId , gameId, offset, limit, order,	desc, status, startDate ){
		const params = [];
		let query = `
      SELECT rentals.*, games.name AS "rentedGameName", games.id AS "rentedGameId", customers.name AS "customerName", customers.id AS "rentCustomerId" 
      FROM rentals 
      JOIN games ON rentals."gameId" = games.id
      JOIN customers ON rentals."customerId" = customers.id
      WHERE 1=1
    `;

		if( customerId ){
			params.push( customerId );
			query +=` AND "customerId" = $${params.length} `;
		}

		if( gameId ){
			params.push( gameId );
			query +=` AND "gameId" = $${params.length} `;
		}

		if( ['closed', 'open'].includes( status ) ){
			query+=` AND rentals."returnDate" IS ${status==='open' ? '' : 'NOT'} NULL`;
		}

		if( startDate ){
			params.push( startDate  );
			query+=` AND rentals."rentDate" >= $${params.length}`;
		}

		if( order ){
			params.push(  );
			query+=` ORDER BY "${order}" ${desc ? 'DESC' : 'ASC'}`;
		}

		if( limit ){
			params.push( limit );
			query +=` LIMIT $${params.length}`;
		}

		if( offset ){
			params.push( offset );
			query +=` OFFSET $${params.length}`;
		}
		return db.query( `${query};`, params );
	}

	listByRentalId( id ){
		return db.query( `
      SELECT * FROM rentals WHERE id = $1;
    `,[id] );
	}

	delete( id ){
		return db.query( `
      DELETE FROM rentals WHERE id= $1;
    `, [id] );
	}

	update( id, returnDate, delayFee = null ){
		return db.query( `
      UPDATE rentals SET "returnDate" = $2, "delayFee" = $3
      WHERE id = $1;
    `,[id, returnDate, delayFee] );
	}
}

export default new RentalsRepository;