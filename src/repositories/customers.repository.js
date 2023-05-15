import db from '../database/connection.js';
import customerQuery from '../helpers/customerQueryConstructor.js';

class CustomersRepository
{
	create( name, phone, cpf, birthday ){
		return db.query( `
			INSERT INTO customers (name, phone, cpf, birthday)
			VALUES ($1, $2, $3, $4);
		`, [name, phone,  cpf , birthday] );
	}

	list( cpf, limit, offset, order, desc ){
		const {query, params} = customerQuery( cpf, limit, offset, order, desc );
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