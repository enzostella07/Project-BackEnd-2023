import express from "express";
import cartsApiController from "../controller/carts-api.controller.js";
export const cartsApiRouter = express.Router();

cartsApiRouter.get("/", cartsApiController.getCartAll);

cartsApiRouter.get("/:cid", cartsApiController.getCartById);

cartsApiRouter.post("/", cartsApiController.addCart);

cartsApiRouter.post("/:cid/products/:pid", cartsApiController.addProduct);

cartsApiRouter.delete("/:cid/products/:pid", cartsApiController.removeProduct);

cartsApiRouter.put("/:cid/products/:pid", cartsApiController.updateProductQuantity);

cartsApiRouter.delete("/:cid", cartsApiController.clearCart);

cartsApiRouter.put("/:cid", cartsApiController.updateCart );


