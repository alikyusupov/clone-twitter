const Tweet  = require("../models/Tweet")
const User  = require("../models/User")
const {apiErrorHandler} = require("../utils/error/apiErrorHandler")
const { uploadFile , getFileStream } = require('../s3.js');

exports.postTweet = async (req, next) =>{
    try{
        let tweet;
        if (!req.body.imagePath) {
            tweet =  new Tweet({ 
                authorID:req.body.authorID, 
                desc:req.body.desc,
                id:req.body.id
            })
        } else {
            await uploadFile(req);
            const imagePath = `/images/${req.body.postId}`;
            tweet =  new Tweet({ 
                authorID:req.body.authorID, 
                desc:req.body.desc,
                id:req.body.id,
                imagePath: imagePath
            })
        }
        const result = await tweet.save()
        User.findByIdAndUpdate(req.body.id,{$push:{"tweets":result._id}}).exec()
        return result
    }catch(err){
        return next(apiErrorHandler(err, 401, "Tweet saving failure!"))
    }
}

exports.getTweets = async (req, next) =>{
    try{
        const userID = req.params.userID;
        const details = await User.findById(userID).populate("tweets")
        return details.tweets
    }catch(err){
        return next(apiErrorHandler(err, 401, "Tweets fetching failure!"))
    }
}

exports.deleteTweet = async (req, res, next)=>{
    try{
        const result = await Tweet.findByIdAndDelete(req.params.id);
        if(result)
            res.status(200).json({result})
    }catch(err){
        return next(apiErrorHandler(err, 500, err.message))
    }
}

exports.getTweetImage = async (req, res, next)=>{
    try{
        const key = req.params.key;
        const readStream = getFileStream(key);
        readStream.pipe(res);
    }catch(err){
        return next(apiErrorHandler(err, 500, err.message))
    }
}
