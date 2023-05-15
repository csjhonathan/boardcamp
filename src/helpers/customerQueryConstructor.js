export default function customerQuery( cpf, limit, offset, order, desc ){
	const params = [];
	let query = `
	SELECT * 
	FROM customers 
	WHERE 1=1
	`;

	if( cpf ){
		params.push( `${cpf}%` );
		query += ` AND cpf LIKE $${params.length}`;
	}

	if( order ){
		query+= ` ORDER BY "${order}" ${desc? 'DESC' : 'ASC'}`;
	}

	if( limit ){
		params.push( limit );
		query += ` LIMIT $${params.length}`;
	}

	if( offset ){
		params.push( offset );
		query += ` OFFSET $${params.length}`;
	}

	return {query, params};
}