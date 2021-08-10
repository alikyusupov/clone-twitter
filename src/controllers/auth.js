const authService = require("../services/authService")
const {apiErrorHandler} = require("../utils/error/apiErrorHandler")

exports.postSignup = async (req, res, next)=>{
    try{
        const result = await authService.signup(req, res, next)
        if(result)
            res.status(201).json({message:"Account is created. Please login to continue"})
    }catch(err){
        return next(apiErrorHandler(err, 401, err.message, err.errors))
    }
}

exports.postLogin = async (req, res, next)=>{
   try{
       const result = await authService.login(req, next)
       if(result)
            res.status(200).json({result})
   }catch(err){
        return next(apiErrorHandler(err, 401, err.message, err.errors))
   }
}
