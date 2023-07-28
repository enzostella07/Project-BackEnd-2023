import { cartService } from "../services/carts.service.js";

class cartsController {
  getCartById = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cart = await cartService.getCartsById(cartId);
      console.log("cart" + cart);
      const plainCart = cart.products.map((doc) => doc.toObject());
      console.log("cart" + plainCart);
      res.status(200).render("carts", { plainCart });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}

export default new cartsController();
