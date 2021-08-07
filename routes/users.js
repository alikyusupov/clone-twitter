const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/users")
const {isAuth} = require("../middleware/isAuth")


router.get("/profile/:userID", isAuth, userControllers.getProfile)


module.exports = router
