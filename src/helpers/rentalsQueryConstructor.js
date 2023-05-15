export default function rentalQuery( {customerId , gameId, offset, limit, order,	desc, status, startDate} ){
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

	return {query, params};
}