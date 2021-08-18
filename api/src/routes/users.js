const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/users")
const {isAuth} = require("../middleware/isAuth")


router.get("/profile/:userID", isAuth, userControllers.getProfile)
router.put("/follow", express.json(), isAuth, userControllers.postFollow)
router.post("/bookmark", express.json(), isAuth, userControllers.postBookmark)
router.get("/bookmarks/:userID", isAuth, userControllers.getBookmarks)
router.get("/followers/:userID", isAuth, userControllers.getFollowers)
router.post("/chat", express.json(), isAuth, userControllers.postChat)

module.exports = router
