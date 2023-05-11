import db from '../database/connection.js';

class RentalsRepository
{
	create( costumerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee ){
		return db.query( `
    INSERT INTO rentals ( "customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee" )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,[ costumerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee] );
	}

	list(){
		return db.query( `
      SELECT rentals.*, games.name AS "rentedGameName", games.id AS "rentedGameId", customers.name AS "customerName", customers.id AS "rentCustomerId" 
      FROM rentals 
      JOIN games ON rentals."gameId" = games.id
      JOIN customers ON rentals."customerId" = customers.id;    
    ` );
	}

	listByQuery( customerId , gameId ){
		if( customerId ){
			return db.query( `
        SELECT rentals.*, games.name AS "rentedGameName", games.id AS "rentedGameId", customers.name AS "customerName", customers.id AS "rentCustomerId" 
        FROM rentals 
        JOIN games ON rentals."gameId" = games.id
        JOIN customers ON rentals."customerId" = customers.id
        WHERE "customerId" = $1;    
    `, [ customerId ] );
		}
		if( gameId ){
			return db.query( `
        SELECT rentals.*, games.name AS "rentedGameName", games.id AS "rentedGameId", customers.name AS "customerName", customers.id AS "rentCustomerId" 
        FROM rentals 
        JOIN games ON rentals."gameId" = games.id
        JOIN customers ON rentals."customerId" = customers.id
        WHERE "gameId" = $1;    
    `, [ gameId ] );
		}
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