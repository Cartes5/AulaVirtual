const bcrypt = require("bcrypt");
const { Student } = require("../models/models");
const saltRounds = 12;

// LOGIN
const loginStudent = (req, res) => {
  const { email, password } = req.query;

  Student.find({ email: email }, (err, doc) => {
    err && res.status(500).json({ message: "Error servidor" });
    if (doc.length > 0) {
      let updateDoc = [
        {
          _id: doc[0]._id,
          fName: doc[0].fName,
          lName: doc[0].lName,
          role: doc[0].role,
          classes: doc[0].classes,
          subscribed: doc[0].subscribed,
        },
      ];

      bcrypt.compare(password, doc[0].password, (error, match) => {
        error && res.status(500).json({ message: "Error servidor" });
        match
          ? res.status(200).json(updateDoc)
          : res.status(401).json({ message: "No autorizado" });
      });
    } else {
      res.status(404).json({ message: "Usuario no registrado" });
    }
  });
};

//REGISTRO

const registerStudent = async (req, res) => {
  const { fName, lName, email, password } = req.body;

  const hash = await bcrypt.hash(password, saltRounds);

  Student.find({ email: email }, async (err, docs) => {
    err &&
      res.status(500).json({ message: "Algo salió mal en el servidor" });
    if (docs.length > 0) {
      res.status(409).json({ message: "Ya esta registrado" });
    } else {
      const newStudentInfo = new Student({
        fName,
        lName,
        email,
        password: hash,
        role: "Student",
        classes: [],
      });
      await newStudentInfo.save((err, docs) =>
        err
          ? res.status(500).json({ message: "No se pudo registrar estudiante" })
          : res.status(200).json({
              _id: docs._id,
              fName: docs.fName,
              lName: docs.lName,
              role: docs.role,
              classes: docs.classes,
              subscribed: docs.subscribed,
              email,
            })
      );
    }
  });
};

module.exports = { loginStudent, registerStudent };