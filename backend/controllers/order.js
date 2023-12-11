const orderModel = require("../models/order");

const createOrder = async (req, res) => {
  try {
    const data = await orderModel.create({
      items: req.body,
      user: req.session.userId,
    });
    res.status(200).send({ data });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
};
const getOrderList = async (req, res) => {
  try {
    const data = await orderModel.find({
      user: req.session.userId,
    });
    res.status(200).send({ data });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
};

module.exports = {
  "[POST] /order": createOrder,
  "[GET] /orders": getOrderList,
};
