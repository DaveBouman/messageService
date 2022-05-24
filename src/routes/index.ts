import { useErrorHandler as use } from '../middleware/apiErrorMiddleware';
import { Router, } from 'express';
import Message from './message';

const routes = Router();

routes.use('/messages', Message);

export default routes;