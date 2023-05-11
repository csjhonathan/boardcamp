import { Router } from 'express';
import customersSchema from '../schemas/customer.schema.js';
import CustomersController from '../controllers/customers.controller.js';
import customersValidation from '../middlewares/customer.validation.js';

const customersRoute = Router();

customersRoute.post( '/customers', customersValidation( customersSchema ), CustomersController.create );
customersRoute.get( '/customers', CustomersController.list );
customersRoute.get( '/customers/:id', CustomersController.listById );
customersRoute.put( '/customers/:id', customersValidation( customersSchema ),CustomersController.update );


export default customersRoute;