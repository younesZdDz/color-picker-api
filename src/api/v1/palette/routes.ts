import express from 'express';
import { validate } from 'express-validation';
import controller from './controller';
import validation from './validation';
import { authorize } from '../../../middlewares/auth';

const routes = express.Router();

routes.route('/').get(validate(validation.getPalettes, { keyByField: true }), authorize, controller.getPalettes);

routes.route('/add').post(validate(validation.addPalette, { keyByField: true }), authorize, controller.addPalette);

routes.route('/delete/:id').delete(validate(validation.deletePalette), authorize, controller.deletePalette);

export default routes;
