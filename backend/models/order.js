const mongoose = require("mongoose");
const { Schema } = mongoose;

const pizzaOrderSchema = new Schema({
  pizza: { type: mongoose.Schema.Types.ObjectId, ref: "Pizza", required: true },
  size: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
  topping: { type: mongoose.Schema.Types.ObjectId, ref: "Topping" },
  name: { type: String },
  address: { type: String },
});

const orderSchema = new Schema({
  items: [pizzaOrderSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Order", orderSchema);
