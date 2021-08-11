const express = require("express")
const router = express.Router()
const tweetController = require("../controllers/tweet.js")
const {isAuth} = require("../middleware/isAuth")

router.get('/:userID', 
    isAuth, 
    tweetController.getTweets);

router.post('/',  
    express.json({limit: '50mb'}), 
    isAuth, 
    tweetController.postTweet);

router.delete('/:id', 
    isAuth, 
    tweetController.deleteTweet)

router.get('/images/:id',  
    isAuth, 
    tweetController.getTweetImage)

router.post("/comment", 
    express.json(), 
    isAuth, 
    tweetController.postComment)


module.exports = router
