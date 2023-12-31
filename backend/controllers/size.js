// Dongxu Xia, Zhaoning Li, Sahir Prajapati 
// 8886742 / 8913790 / 8887839 

const sizeModel = require("../models/size");

const getSizeList = async (req, res) => {
  try {
    const data = await sizeModel.find();
    res.status(200).send({ data });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
};

module.exports = {
  "[GET] /size": getSizeList,
};
