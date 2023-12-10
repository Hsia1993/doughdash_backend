const orderModel = require("../models/order");

const createOrder = async (req, res) => {
  try {
    const data = await orderModel.create(req.body);
    res.status(200).send({ data });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
};

module.exports = {
  "[POST] /order": createOrder,
};
