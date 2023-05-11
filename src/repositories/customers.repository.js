import db from '../database/connection.js';

class CustomersRepository
{
	create( name, phone, cpf, birthday ){
		return db.query( `
			INSERT INTO customers (name, phone, cpf, birthday)
			VALUES ($1, $2, $3, $4);
		`, [name, phone, Number( cpf ), birthday] );
	}

	list( cpf, limit, offset, order, desc ){
		const params = [];
		let query = 'SELECT * FROM customers WHERE 1=1';

		if( cpf ){
			params.push( `${cpf}%` );
			query += `AND cpf LIKE $${params.length}`;
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

		return db.query( `${query};`, params );
	}

	listById( id ){
		return db.query( `
				SELECT * FROM customers WHERE id = $1;
			`, [id] );
	}

	update( id, name, phone, cpf, birthday ){
		return db.query( `
				UPDATE customers SET name = $2, phone = $3, cpf = $4, birthday = $5
				WHERE id = $1
		` , [id, name, phone, cpf, birthday] );
	}
	
}

export default new CustomersRepository;