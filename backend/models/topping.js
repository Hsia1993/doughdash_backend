const mongoose = require("mongoose");
const { Schema } = mongoose;
const toppingSchema = new Schema({
  name: { type: String, unique: [true, "Name existed!"] },
  price: Number,
});

module.exports = mongoose.model("Topping", toppingSchema);
