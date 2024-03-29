const { Class } = require("../models/models");

const getSpecClass = (req, res) => {
  let id = req.params.id;
  Class.find({ _id: id }, (err, docs) => {
    err
      ? res.status(500).json({ message: "Ocurrio error en el servidor" })
      : res.status(200).json(docs[0]);
  });
};

module.exports = { getSpecClass };
