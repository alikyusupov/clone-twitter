const router = require("express").Router();
const express = require("express")
const {check, body} = require("express-validator")
const authController = require("../controllers/authController")

//REGISTER
router.post("/register",express.json(),
[
  check('email')
      .isEmail()
      .withMessage('Please enter a valid email.'),
    body(
      'password',
      'Please enter a password with at least 3 characters.'
    )
      .isLength({ min: 6 })
],
authController.register)

//LOGIN
router.post("/login",express.json(), authController.login)

module.exports = router;
