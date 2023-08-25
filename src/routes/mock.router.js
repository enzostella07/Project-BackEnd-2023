import express from 'express';
import { mockController } from '../controller/mock.controller.js';
export const mockRouter = express.Router();

mockRouter.get('/', mockController.getMockingProducts);
mockRouter.post('/', mockController.addMockgingProduct);
mockRouter.post('/', mockController.addMockgingProduct);
