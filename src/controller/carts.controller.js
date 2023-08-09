import { cartService } from "../services/carts.service.js";

class cartsController {
  getCartById = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cart = await cartService.getCartsById(cartId);
      const plainCart = cart.products.map((doc) => doc.toObject());
      console.log("hola", plainCart);
      res.status(200).render("carts", { plainCart, cartId: cartId });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}

export default new cartsController();
