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

