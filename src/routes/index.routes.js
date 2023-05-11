import { Router } from 'express';
import gamesRoute from './games.routes.js';
import customerRoute from './customers.routes.js';

const routes = Router();

routes.use( gamesRoute );
routes.use( customerRoute );

export default routes;