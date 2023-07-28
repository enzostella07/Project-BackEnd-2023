import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const schema = new Schema({
  products: {
    type: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    default: [],
  },
});

export const CartsModel = model("carts", schema);
