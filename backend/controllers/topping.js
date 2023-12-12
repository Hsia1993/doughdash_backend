// Dongxu Xia, Zhaoning Li, Sahir Prajapati 
// 8886742 / 8913790 / 8887839 

const toppingModel = require("../models/topping");

const getToppingList = async (req, res) => {
  try {
    const data = await toppingModel.find();
    res.status(200).send({ data });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
};
module.exports = {
  "[GET] /topping": getToppingList,
};
