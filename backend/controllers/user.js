// Dongxu Xia, Zhaoning Li, Sahir Prajapati 
// 8886742 / 8913790 / 8887839 

const userModel = require("../models/user");

const bcrypt = require("bcrypt");

const saveUser = async (req, res) => {
  try {
    const { username } = await userModel.create(req.body);
    res.status(200).send({ data: { username } });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await userModel.findOne({ username });
    if (data) {
      const same = await bcrypt.compare(password, data.password);
      if (same) {
        req.session.userId = data.id;
        res.status(200).send({ data: { username } });
      } else {
        throw "Wrong password";
      }
    } else {
      throw "User not exist";
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Username do not exist or wrong password" });
  }
};
const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/login");
  } catch (e) {
    res.redirect("/");
  }
};

const changePass = async (req, res) => {
  try {
    const { username, password, oldPassword } = req.body;
    const data = await userModel.findOne({ username });
    if (data) {
      const same = await bcrypt.compare(oldPassword, data.password);
      if (same) {
        const hash = await bcrypt.hash(password, 10);
        await userModel.findByIdAndUpdate(data._id, { password: hash });
        res.status(200).send({ data: { username } });
      } else {
        throw "Wrong password";
      }
    } else {
      throw "User not exist";
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Username do not exist or wrong password" });
  }
};
module.exports = {
  "[POST] /user": saveUser,
  "[POST] /login": login,
  "[POST] /signup": saveUser,
  "[GET] /logout": logout,
  "[PUT] /user": changePass,
};
