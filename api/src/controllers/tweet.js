const tweetService = require("../services/tweetService")
const {apiErrorHandler} = require("../utils/error/apiErrorHandler")


exports.postTweet = async (req, res, next)=>{
    try{
        const result = await tweetService.postTweet(req, next)
        if(result)
            res.status(200).json({message:"Tweet successfully saved in DB"})
    }catch(err){
        return next(apiErrorHandler(err, 500, err.message))
    }
}

exports.getTweets = async (req, res, next)=>{
    try{
        const result = await tweetService.getTweets(req, next)
        if(result)
            res.status(200).json({result})
    }catch(err){
        return next(apiErrorHandler(err, 500, err.message))
    }
}

exports.getTimeline = async (req, res, next)=>{
    try{
        const result = await tweetService.getTimeline(req, next)
        if(result)
            res.status(200).json({result})
    }catch(err){
        return next(apiErrorHandler(err, 500, err.message))
    }
}

exports.deleteTweet = async (req, res, next)=>{
    try{
        const result = await tweetService.deleteTweet(req, res, next)
        if(result)
            res.status(200).json({result})
    }catch(err){
        return next(apiErrorHandler(err, 500, err.message))
    }
}

exports.getTweetImage = async (req, res, next)=>{
    try{
        const result = await tweetService.getTweetImage(req, res, next)
        if(result)
            res.status(200).json({result})
    }catch(err){
        return next(apiErrorHandler(err, 500, err.message))
    }
}

exports.postComment = async (req, res, next)=>{
    try{
        const result = await tweetService.postComment(req, next)
        if(result)
            res.status(200).json({message:"Comment is posted!"})
    }catch(err){
        return next(apiErrorHandler(err, 500, err.message))
    }
}
