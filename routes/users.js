const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/users")
const {isAuth} = require("../middleware/isAuth")


router.get("/profile/:userID", isAuth, userControllers.getProfile)
router.post("/follow", express.json(), isAuth, userControllers.postFollow)
router.post("/bookmark", express.json(), isAuth, userControllers.postBookmark)
router.get("/bookmarks/:userID", isAuth, userControllers.getBookmarks)
router.get("/followers/:userID", isAuth, userControllers.getFollowers)

module.exports = router
