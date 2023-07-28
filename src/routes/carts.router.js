import express from "express";
import cartsController from "../controller/carts.controller.js";
export const cartsRouter = express.Router();

cartsRouter.get("/:cid", cartsController.getCartById);
