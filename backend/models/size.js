// Dongxu Xia, Zhaoning Li, Sahir Prajapati 
// 8886742 / 8913790 / 8887839 

const mongoose = require("mongoose");
const { Schema } = mongoose;
const sizeSchema = new Schema({
  price: Number,
  name: String,
});

module.exports = mongoose.model("Size", sizeSchema);
