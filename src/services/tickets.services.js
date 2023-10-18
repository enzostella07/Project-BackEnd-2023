import mongoose from "mongoose";
import { cartService } from "./carts.service.js";
import { productsDAO } from "../DAO/daos/products/products.mongo.dao.js";
import { cartsDAO } from "../DAO/daos/carts/carts.mongo.dao.js";
import { ticketsDAO } from "../DAO/daos/tickets/tickets.mongo.dao.js";

class TicketsService {
  async purchaseCart(cartId, cartList, userMail, userCartId) {
    try {
      if (!Array.isArray(cartList)) {
        return {
          status: 400,
          result: {
            status: 'error',
            error: 'The cart list must be a valid array.',
          },
        };
      }

      if (!cartList || cartList.length === 0) {
        return {
          status: 400,
          result: {
            status: 'error',
            error: `Cart list is empty.`,
          },
        };
      }

      if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return {
          status: 400,
          result: {
            status: 'error',
            error: `Invalid cart ID.`,
          },
        };
      }

      const cartFiltered = await cartsDAO.getById(cartId);

      if (!cartFiltered) {
        return {
          status: 400,
          result: {
            status: 'error',
            error: `Cart not found.`,
          },
        };
      }

      const productsNotPurchased = [];
      const productToPurchase = [];

      // console.log('Lista de compras:', cartList);

      const asyncOperations = cartList.map(async (CartProduct) => {
        const checkStock = await productsDAO.getById(CartProduct.id);

        if (!checkStock) {
          productsNotPurchased.push(CartProduct);
        } else if (checkStock.stock >= CartProduct.quantity) {
          checkStock.stock -= CartProduct.quantity;
          await checkStock.save();
          productToPurchase.push({
            product: checkStock,
            quantity: CartProduct.quantity,
          });
        } else {
          productsNotPurchased.push(CartProduct);
        }
      });

      await Promise.all(asyncOperations); 

      // console.log('FLAG: Products not purchased: ', productsNotPurchased);

      const totalAmount = productToPurchase.reduce((acc, p) => {
        acc += p.product.price * p.quantity;
        return acc;
      }, 0);

      // console.log('FLAG: Total amount: ', totalAmount);

      const productFormat = productToPurchase.map((p) => ({
        id: p.product._id.toString(),
        quantity: p.quantity,
      }));

      const newOrder = {
        code: Math.floor(Math.random() * 1000000),
        purchase_datetime: new Date(),
        amount: +totalAmount,
        purchaser: userMail,
        products: productFormat,
        cartId: cartId,
      };

      const orderCreated = await ticketsDAO.add(newOrder);
      // console.log('FLAG: New order: ', newOrder);

      await cartService.clearCarts(cartId);

      if (productsNotPurchased.length > 0) {
        await cartService.updateCarts(userCartId, productsNotPurchased);
      }

      return {
        status: 200,
        result: { status: 'success', payload: orderCreated },
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        result: { status: 'error', msg: 'Internal Server Error', payload: {} },
      };
    }
  }

  async getTicketById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
          status: 400,
          result: {
            status: 'error',
            error: `Invalid ticket ID.`,
          },
        };
      }

      const ticket = await ticketsDAO.getById(id);
      if (!ticket) {
        return {
          status: 404,
          result: {
            status: 'error',
            error: `Ticket not found.`,
          },
        };
      }

      return {
        status: 200,
        result: { status: 'success', payload: ticket },
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        result: { status: 'error', msg: 'Internal Server Error', payload: {} },
      };
    }
  }
}

export const ticketsService = new TicketsService();
