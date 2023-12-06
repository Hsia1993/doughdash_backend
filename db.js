const mongoose = require("mongoose");
const uri =
  "mongodb+srv://dongxu:ketBSeKPkkMqXYoT@cluster0.n4sbu6g.mongodb.net/?retryWrites=true&w=majority";
async function run() {
  return await mongoose.connect(uri);
}

module.exports = run;
