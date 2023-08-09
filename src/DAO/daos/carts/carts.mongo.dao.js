import mongoose from "mongoose";
import { CartsSchema } from "../../schemas/carts.schema.js";
import { ProductsSchema } from "../../schemas/products.schema.js";

class CartsDAO {
  async getAll() {
    try {
      const carts = await CartsSchema.find({});
      return carts;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(cartId) {
    try {
      const cart = await CartsSchema.findById(cartId).populate("products.product");
      if (!cart) {
        throw new Error("Cart not found");
      }
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async addCart(cartId, prodId) {
    try {
      if (cartId === undefined || prodId === undefined) {
        const newCart = await CartsSchema.create({});
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
              error: `🛑 Invalid product or card ID.`,
            },
          };
        }
      }

      const productFiltered = await ProductsSchema.findOne({ _id: prodId });
      const cartFiltered = await CartsSchema.findOne({ _id: cartId });

      if (!productFiltered || !cartFiltered) {
        return {
          status: 400,
          result: {
            status: "error",
            error: `🛑 Product or Cart not found.`,
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

  async addProduct(cartId, productId) {
    try {
      const cart = await CartsSchema.findById(cartId);
      const product = await ProductsSchema.findById(productId);
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

  async removeProduct(cartId, productId) {
    try {
      const cart = await CartsSchema.findById(cartId);
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

  async updateProductsQ(cartId, productId, quantity) {
    try {
      const cart = await CartsSchema.findById(cartId);
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

  async clearCart(cartId) {
    try {
      const cart = await CartsSchema.findById(cartId);
      cart.products = [];
      await cart.save();
    } catch (error) {
      throw new Error("Error clearing cart");
    }
  }

  async updateCart(cartId, products) {
    try {
      const cart = await CartsSchema.findByIdAndUpdate(
        cartId,
        { products },
        { new: true }
      );
      return cart;
    } catch (error) {
      throw new Error("Error updating cart in database");
    }
  }

  async create(products) {
    const cartCreated = await CartsSchema.create(products);
    return cartCreated;
  }
}

export const cartsDAO = new CartsDAO();
