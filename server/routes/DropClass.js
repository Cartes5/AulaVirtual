const express = require("express");
const router = express.Router();
const {
  dropClassHandler,
  deleteClassHandler,
} = require("../controllers/DropClass");
// SALIDA DE CLASE DEL ESTUDIANTE
const dropClass = router.put("/api/student/classes/delete", dropClassHandler);

// CLASE BORRADA PROFESOR
const deleteClass = router.delete(
  "/api/teacher/classes/delete",
  deleteClassHandler
);

module.exports = { dropClass, deleteClass };
