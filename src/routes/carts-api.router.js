import express from "express";
import cartApiController from "../controller/carts-api.controller.js";
export const cartsApiRouter = express.Router();

cartsApiRouter.get("/", cartApiController.getCartAll);

cartsApiRouter.get("/:cid", cartApiController.getCartById);

cartsApiRouter.post("/", cartApiController.addCart);

cartsApiRouter.post("/:cid/products/:pid", cartApiController.addProduct);

cartsApiRouter.delete("/:cid/products/:pid", cartApiController.removeProduct);

cartsApiRouter.put("/:cid/products/:pid", cartApiController.updateProductQuantity);

cartsApiRouter.delete("/:cid", cartApiController.clearCart);

cartsApiRouter.put("/:cid", cartApiController.updateCart );

cartsApiRouter.put('/:cid/purchase', cartApiController.purchaseCart);



