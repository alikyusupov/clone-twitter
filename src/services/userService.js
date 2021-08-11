const User  = require("../models/User")
const {apiErrorHandler} = require("../utils/error/apiErrorHandler")

exports.getProfile = async (req, next) =>{
    try{
        const user = await User.findById(req.params.userID).populate({
            path:"followers",
            populate:{
                path:"tweets"
            }
        })
        const relatedTweets = user.followers.flatMap(follower=>follower.tweets)
        return relatedTweets
    }catch(err){
        return next(apiErrorHandler(err, 401, err.message))
    }
}

exports.postFollow = async (req, next)=>{
    try{
        const userID =  req.body.userID
        const followID = req.body.followID
        const result1 = await User.findByIdAndUpdate(userID, {$push:{"followed":followID}}).exec()
        const result2 = await User.findByIdAndUpdate(followID, {$push:{"followers":result1._id}}).exec()
        return result2
    }catch(err){
        return next(apiErrorHandler(err, 401, err.message))
    }
}

exports.postBookmark = async (req, next)=>{
    try{
        const {tweetID, userID} = req.body
        const result = await User.findByIdAndUpdate(userID, {$push:{"bookmarks":tweetID}}).exec()
        return result
    }
    catch(err){
        return next(apiErrorHandler(err, 401, err.message))
    }
}

exports.getBookmarks = async (req, next)=>{
    try{
        const result = await User.findById(req.params.userID).populate("bookmarks")
        return result.bookmarks
    }
    catch(err){
        return next(apiErrorHandler(err, 401, err.message))
    }
}

exports.getFollowers = async (req, next)=>{
    try{
        const result = await User.findById(req.params.userID).populate("followers")
        return result.followers
    }
    catch(err){
        return next(apiErrorHandler(err, 401, err.message))
    }
}