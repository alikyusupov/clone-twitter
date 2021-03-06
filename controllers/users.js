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
