import { Router } from 'express';
import gamesRoute from './games.routes.js';
import customerRoute from './customers.routes.js';
import rentalsRoute from './rentals.routes.js';

const routes = Router();

routes.use( gamesRoute );
routes.use( customerRoute );
routes.use( rentalsRoute );

export default routes;