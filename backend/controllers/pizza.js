// Dongxu Xia, Zhaoning Li, Sahir Prajapati 
// 8886742 / 8913790 / 8887839 

const pizzaModel = require("../models/pizza");

const getPizzaList = async (req, res) => {
  try {
    const data = await pizzaModel.find();
    res.status(200).send({ data });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
};

module.exports = {
  "[GET] /pizza": getPizzaList,
};
