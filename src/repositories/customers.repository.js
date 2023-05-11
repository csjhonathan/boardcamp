import db from '../database/connection.js';

class CustomersRepository
{
	create( name, phone, cpf, birthday ){
		return db.query( `
			INSERT INTO customers (name, phone, cpf, birthday)
			VALUES ($1, $2, $3, $4);
		`, [name, phone, Number( cpf ), birthday] );
	}

	list( cpf ){
		if( cpf ){
			const query = {
				text: 'SELECT * FROM customers WHERE cpf LIKE $1;',
				values: [`${cpf}%`],
			};
			return db.query( query );
		}
		return db.query( 'SELECT * FROM customers;' );
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