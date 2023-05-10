import { Router } from 'express';
import GamesControllers from '../controllers/games.controller.js';
import gameValidation from '../middlewares/game.schema.validation.js';
import gameSchema from '../schemas/games.schema.js';
const gamesRouter = Router();

gamesRouter.get( '/games', GamesControllers.list );
gamesRouter.post( '/games', gameValidation( gameSchema ) ,GamesControllers.create );


export default gamesRouter;