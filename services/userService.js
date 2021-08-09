const User  = require("../models/User")
const {apiErrorHandler} = require("../utils/error/apiErrorHandler")

exports.getProfile = async (req, next) =>{
    try{
        const user = await User.findById(req.params.userID)
        return user
    }catch(err){
        return next(apiErrorHandler(err, 401, "User with this ID is not found in DB"))
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


