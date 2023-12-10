const mongoose = require("mongoose");
const { Schema } = mongoose;
const pizzaSchema = new Schema({
  name: { type: String, unique: [true, "Name existed!"] },
  description: String,
  price: Number,
  picUrl: String,
});

module.exports = mongoose.model("Pizza", pizzaSchema);
