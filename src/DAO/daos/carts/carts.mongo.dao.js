import mongoose from 'mongoose';
import { CartsSchema } from '../../schemas/carts.schema.js';
import { ProductsSchema } from '../../schemas/products.schema.js';

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
      const cart = await CartsSchema.findById(cartId).populate('products.product');
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async getById2(cartId) {
    try {
      const cart = await CartsSchema.findOne({ _id: cartId })
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async addCart() {
    try {
      const newCart = await CartsSchema.create({});
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductsQ(cartId, productId, quantity) {
    try {
      const cart = await CartsSchema.findById(cartId);
      const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
      if (productIndex === -1) {
        throw new Error('Product not found in cart');
      }
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error updating product quantity in cart');
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await CartsSchema.findById(cartId);
      cart.products = [];
      await cart.save();
    } catch (error) {
      throw new Error('Error clearing cart');
    }
  }

  async updateCart(cartId, products) {
    try {
      const cart = await CartsSchema.findByIdAndUpdate(cartId, { products }, { new: true });
      return cart;
    } catch (error) {
      throw new Error('Error updating cart in database');
    }
  }

  async create(products) {
    const cartCreated = await CartsSchema.create(products);
    return cartCreated;
  }
}

export const cartsDAO = new CartsDAO();
