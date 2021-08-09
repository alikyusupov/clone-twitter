const userService = require("../services/userService")
const {apiErrorHandler} = require("../utils/error/apiErrorHandler")

exports.getProfile = async (req, res, next)=>{
    try{
        const result = await userService.getProfile(req, next)
        if(result)
            res.status(200).json({result})
    }
    catch(err){
        return next(apiErrorHandler(err, 500, err.message))
    }
}

exports.postFollow = async (req, res, next)=>{
    try{
        const result = await userService.postFollow(req, next)
        if(result)
            res.status(200).json({message:"You followed a user!"})
    }
    catch(err){
        return next(apiErrorHandler(err, 500, err.message))
    }
}

exports.postBookmark = async (req, res, next)=>{
    try{
        const result = await userService.postBookmark(req, next)
        if(result)
            res.status(200).json({message:"Invitation accepted!!"})
    }catch(err){
        return next(apiErrorHandler(err, 500, err.message))
    }
}

exports.getBookmarks = async (req, res, next)=>{
    try{
        const result = await userService.getBookmarks(req, next)
        if(result)
            res.status(200).json({result})
    }catch(err){
        return next(apiErrorHandler(err, 500, err.message))
    }
}

exports.getFollowers = async (req, res, next)=>{
    try{
        const result = await userService.getFollowers(req, next)
        if(result)
            res.status(200).json({result})
    }catch(err){
        return next(apiErrorHandler(err, 500, err.message))
    }
}