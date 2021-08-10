const express = require("express")
const router = express.Router()
const { check, body} = require("express-validator")
const authControllers = require("../controllers/auth")

router.post("/signup", express.json(),
[
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.'),
    body(
      'password',
      'Please enter a password with at least 3 characters.'
    )
      .isLength({ min: 3 })
  ],
 authControllers.postSignup)

 router.post("/login", express.json(), authControllers.postLogin)

module.exports = router
