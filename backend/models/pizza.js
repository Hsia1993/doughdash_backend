// Dongxu Xia, Zhaoning Li, Sahir Prajapati 
// 8886742 / 8913790 / 8887839 

const mongoose = require("mongoose");
const { Schema } = mongoose;
const pizzaSchema = new Schema({
  name: { type: String, unique: [true, "Name existed!"] },
  description: String,
  price: Number,
  picUrl: String,
});

module.exports = mongoose.model("Pizza", pizzaSchema);
