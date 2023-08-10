import { cartService } from "../services/carts.service.js";

class cartApiController{
  getCartAll = async (req, res) => {
    try {
      const cart = await cartService.getCartsAll();
      res.status(200).json({
        status: "success",
        payload: cart,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  getCartById = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cart = await cartService.getCartsById(cartId);
      res.status(200).json({
        status: "success",
        payload: cart,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  addCart = async (req, res) => {
    try {
      const { products } = req.body;
      const newCart = await cartService.addCarts({ products });
      res.status(200).json({
        status: "success",
        payload: newCart,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).render("error", {error: "Internal Server Error"});
    }
  };
  
  addProduct = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.addProducts(cid, pid);
      res.status(200).json({
        status: "success",
        payload: cart,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  removeProduct = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.removeProducts(cid, pid);
      res
        .status(200)
        .json({ status: "success", message: "Product removed from cart", cart });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {error: "Internal Server Error"});
    }
  };

  updateProductQuantity = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartService.updateProductsQuantity(cid, pid, quantity);
      res
        .status(200)
        .json({ status: "success", message: "Product quantity updated", cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  }; 

  clearCart = async (req, res) => {
    try {
      const { cid } = req.params;
      await cartService.clearCarts(cid);
      res
        .status(200)
        .json({ status: "success", message: "Cart cleared successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };

  updateCart = async (req, res) => {
    try {
      const { cid } = req.params;
      console.log(req.params);
      const { products } = req.body;
      // const cart = await cartService.updateCarts(cid, products);
      res
        .status(200)
        .json({ status: "success", message: "Cart updated successfully", cid  });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };

  purchaseCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const cartList = req.body;
      const cart = await cartService.purchaseCarts(cid);
      res
        .status(200)
        .json({ status: "success", message: "Cart purchased successfully", cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };
}
  
export default new cartApiController();
