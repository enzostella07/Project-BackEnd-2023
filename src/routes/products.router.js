import express from "express";
import productsController from "../controller/products.controller.js"
export const productsRouter = express.Router();

productsRouter.get("/", productsController.getAllWithPagination);
