const mongoose = require("mongoose");
const { Schema } = mongoose;

const pizzaOrderSchema = new Schema({
  pizza: { type: mongoose.Schema.Types.ObjectId, ref: "Pizza", required: true },
  size: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
  toppings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topping" }],
  name: { type: String },
  address: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const orderSchema = new Schema({
  items: [pizzaOrderSchema],
});

module.exports = mongoose.model("Order", orderSchema);
