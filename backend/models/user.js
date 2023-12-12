// Dongxu Xia, Zhaoning Li, Sahir Prajapati 
// 8886742 / 8913790 / 8887839 

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const userSchema = new Schema({
  password: String,
  username: { type: String, unique: [true, "Username existed!"] },
});
async function hashPassword(next) {
  const user = this;
  try {
    if (user.isModified("password")) {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    }
    next();
  } catch (e) {
    return next(e);
  }
}
userSchema.pre("save", hashPassword);
module.exports = mongoose.model("User", userSchema);
