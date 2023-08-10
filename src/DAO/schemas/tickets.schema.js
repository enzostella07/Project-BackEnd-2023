import { Schema, model } from "mongoose";

const schema = new Schema({
	code: { type: String, unique: true },
	purchase_datetime: { type: Date, required: true, default: Date.now },
	purchaser: { type: String, required: true },
	cartId: { type: String, required: true },
	amount: { type: Number, required: true },
	products: [
		{
			product: { type: Schema.Types.ObjectId, ref: "products" },
			quantity: { type: Number, required: true },
		},
	],
});

export const TicketsSchema = model("tickets", schema);
