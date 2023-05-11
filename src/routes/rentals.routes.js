import { Router } from 'express';
import RentalsController from '../controllers/rentals.controller.js';

const rentalsRoute = Router();

rentalsRoute.post( '/rentals', RentalsController.create );
rentalsRoute.get( '/rentals', RentalsController.list );
rentalsRoute.delete( '/rentals/:id', RentalsController.delete );
rentalsRoute.post( '/rentals/:id/return', RentalsController.update );

export default rentalsRoute;