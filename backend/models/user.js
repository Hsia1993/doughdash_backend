const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const userSchema = new Schema({
  password: String,
  username: { type: String, unique: [true, "Username existed!"] },
});

userSchema.pre("save", async function (next) {
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
});
module.exports = mongoose.model("User", userSchema);
