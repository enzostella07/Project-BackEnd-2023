import express from "express";
import productApiController from "../controller/products-api.controller.js";
export const productsApiRouter = express.Router();

productsApiRouter.get("/", productApiController.getAllWithPagination);

productsApiRouter.post("/", productApiController.createProduct);

productsApiRouter.put("/:_id", productApiController.updateProduct);

productsApiRouter.delete("/:_id", productApiController.delete);
