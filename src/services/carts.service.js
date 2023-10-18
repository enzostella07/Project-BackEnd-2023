import mongoose from "mongoose";
import { productsDAO } from "../DAO/daos/products/products.mongo.dao.js";
import { cartsDAO } from "../DAO/daos/carts/carts.mongo.dao.js";

class CartService {
  async getCartsAll() {
    try {
      const carts = await cartsDAO.getAll({});
      return carts;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartsById(cartId) {
    try {
      const cart = await cartsDAO.getById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async addCarts(cartId, prodId) {
    try {
      if (cartId === undefined || prodId === undefined) {
        const newCart = await cartsDAO.addCart({});
        return { status: 200, result: { status: "success", payload: newCart } };
      } else {
        if (
          !mongoose.Types.ObjectId.isValid(prodId) ||
          !mongoose.Types.ObjectId.isValid(cartId)
        ) {
          return {
            status: 400,
            result: {
              status: "error",
              error: `Invalid product or card ID.`,
            },
          };
        }
      }

      const productFiltered = await productsDAO.getById(prodId);
      const cartFiltered = await cartsDAO.getById2(cartId);

      if (!productFiltered || !cartFiltered) {
        return {
          status: 400,
          result: {
            status: "error",
            error: `Product or Cart not found.`,
          },
        };
      }
      const productIndex = cartFiltered.products.findIndex((p) =>
        p.id.equals(prodId)
      );
      if (productIndex !== -1) {
        cartFiltered.products[productIndex].quantity += 1;
      } else {
        cartFiltered.products.push({ id: prodId, quantity: 1 });
      }
      await cartFiltered.save();
      return {
        status: 200,
        result: { succes: true, payload: cartFiltered },
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        result: { status: "error", msg: "Internal Server Error", payload: {} },
      };
    }
  }

  async addProducts(cartId, productId) {
    try {
      const cart = await cartsDAO.getById2(cartId);
      const product = await productsDAO.getById(productId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      if (!product) {
        throw new Error("Product not found");
      }
      cart.products.push({ product: product._id, quantity: 1 });
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async removeProducts(cartId, productId) {
    try {
      const cart = await cartsDAO.getById2(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }
      cart.products.splice(productIndex, 1);
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("Error removing product from cart");
    }
  }

  async updateProductsQuantity(cartId, productId, quantity) {
    try {
      const cart = await cartsDAO.getById2(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("Error updating product quantity in cart");
    }
  }

  async clearCarts(cartId) {
    try {
      const cart = await cartsDAO.getById2(cartId);
      cart.products = [];
      await cart.save();
    } catch (error) {
      throw new Error("Error clearing cart");
    }
  }

  async updateCarts(cartId, products) {
    try {
      const cart = await cartsDAO.updateCart(
        cartId,
        { products },
        { new: true }
      );
      return cart;
    } catch (error) {
      throw new Error("Error updating cart in database");
    }
  }

  async createOne(products) {
    const cartCreated = await cartsDAO.create(products);
    return cartCreated;
  }
}

export const cartService = new CartService();
