export default function gameQuery(  name, limit, offset, order, desc ){
	const params = [];
	let query = `
  SELECT * 
  FROM games 
  WHERE 1=1
  `;

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
  
	return {query, params};
}