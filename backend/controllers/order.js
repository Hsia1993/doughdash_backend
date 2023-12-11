const orderModel = require("../models/order");
const exportPdf = require("../utils/exportPDF");

const createOrder = async (req, res) => {
  try {
    const data = await orderModel.create({
      items: [req.body],
      user: req.session.userId,
    });
    res.status(200).send({ data });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
};
const getOrderList = async (req, res) => {
  try {
    const data = await orderModel
      .find({
        user: req.session.userId,
      })
      .populate("user")
      .populate({
        path: "items",
        populate: ["pizza", "size", "topping"],
      });
    res.status(200).send({ data });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
};

const exportOrders = async (req, res) => {
  try {
    const data = await orderModel
      .find({
        user: req.session.userId,
      })
      .populate("user")
      .populate({
        path: "items",
        populate: ["pizza", "size", "topping"],
      });
    const renderData = data.filter(({ user }) => user).map((d) => d.items[0]);
    const fileBuffer = await exportPdf(data[0].user.username, renderData);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=output.pdf");

    res.send(fileBuffer);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  "[POST] /order": createOrder,
  "[GET] /orders": getOrderList,
  "[GET] /orders/export": exportOrders,
};
