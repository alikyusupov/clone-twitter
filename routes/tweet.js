const express = require("express")
const router = express.Router()
const tweetController = require("../controllers/tweet.js")
const {isAuth} = require("../middleware/isAuth")

router.get('/:userID', isAuth, tweetController.getTweets);
router.post('/',  express.json(), isAuth, tweetController.postTweet);
router.delete('/:id', isAuth, tweetController.deleteTweet)
router.get('/images/:id', isAuth, tweetController.getTweetImage )


module.exports = router
