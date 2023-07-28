import express from "express";
import productsAdminController from "../controller/products-admin-controller.js";
export const productsAdminRouter = express.Router();

productsAdminRouter.get("/", productsAdminController.getAll);
