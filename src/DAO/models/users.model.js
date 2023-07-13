import { Schema, model } from "mongoose";

const schema = new Schema({
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  first_name: { type: String, required: true, max: 100 },
  rol: { type: String, default: "user", required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  age: { type: Number, required: true },
  cart: { type: String, required: false },
});

export const UserModel = model("users", schema);
