const express = require("express");
const router = express.Router();
const { loginStudent, registerStudent } = require("../controllers/AuthStudent");

// REGISTRO
const registerStudentRoute = router.post(
  "/api/register/student",
  registerStudent
);

// LOGIN
const loginStudentRoute = router.get("/api/login/student", loginStudent);

module.exports = { registerStudentRoute, loginStudentRoute };