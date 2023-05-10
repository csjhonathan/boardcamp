import { Router } from 'express';
import gamesRouter from './games.routes.js';

const routes = Router();

routes.use( gamesRouter );

export default routes;