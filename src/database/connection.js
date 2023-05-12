import pg from 'pg';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const{ Pool } = pg;

const db = new Pool( {
	connectionString: process.env.DATABASE_URL
} );

try {
	await db.connect();
	console.log( chalk.blue( 'DB CONNECTION SUCCESSFULLY' ) );
} catch ( err ) {
	console.error( chalk.red( 'DB CONNECTION FAILED' ), err );
}
export default db;