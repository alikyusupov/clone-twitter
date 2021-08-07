const User = require("../models/User")
const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const { JwtSignPromise } = require("../utils/jwt/JwtSignPromise")
const { apiErrorHandler } = require("../utils/error/apiErrorHandler")

exports.signup = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       return next(apiErrorHandler(null, 401, "Validation error", errors.errors))
    }
    try{
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email:      req.body.email,
            password:   hash,
            name:       req.body.name,
            lastname:   req.body.lastname,
            DOB:        req.body.DOB,
        })
        const result = await user.save()
        return result
    }
    catch(err){
        return next(apiErrorHandler(null, 401, err.message))
    }
}

exports.login = async (req, next) =>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user) return next(apiErrorHandler(null, 401, "User not found"))
        const result = await bcrypt.compare(req.body.password, user.password)
        if(!result) return next(apiErrorHandler(null, 401, "Auth failed"))
        const token = await JwtSignPromise(user.email, user._id)
        if(!token) return next(apiErrorHandler(null, 401, "Token generation fails"))
        return {
            token:token,
            userID:user._id,
            expiresIn:3600*24000
        }
    }catch(err){
        return next(apiErrorHandler(err, 401, err.message))
    }
}
