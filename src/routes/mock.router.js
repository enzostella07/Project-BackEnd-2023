import express from 'express';
import { mockController } from '../controller/mock.controller.js';
export const mockRouter = express.Router();

mockRouter.get('/', mockController.getMockgingProducts);
mockRouter.post('/', mockController.addMockgingProduct);
