const mongoose = require("mongoose");
const { Schema } = mongoose;
const sizeSchema = new Schema({
  price: Number,
  name: String,
});

module.exports = mongoose.model("Size", sizeSchema);
