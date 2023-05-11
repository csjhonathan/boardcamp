import { Router } from 'express';
import GamesControllers from '../controllers/games.controller.js';
import gameValidation from '../middlewares/game.validation.js';
import gameSchema from '../schemas/game.schema.js';

const gamesRoute = Router();

gamesRoute.get( '/games', GamesControllers.list );
gamesRoute.post( '/games', gameValidation( gameSchema ) , GamesControllers.create );


export default gamesRoute;