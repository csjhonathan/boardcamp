import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import routes from './routes/index.routes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app 
	.use( cors() )
	.use( express.json() )
	.use( routes );

app.listen( process.env.PORT , () => {
	console.log( `Server is running on ${chalk.green( `http://localhost:${PORT}` )}` );
} );