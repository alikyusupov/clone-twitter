const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator")
const { JwtSignPromise } = require("../utils/jwt/jwtSignPromise")
const { errorHandler } = require("../utils/error/errorHandler")

exports.register = async (req, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return next(errorHandler(null, 401, "Validation error", errors.errors))
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and respond
        const result = await newUser.save();
        return result
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.login = async (req, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(errorHandler(null, 401, "User not found"))
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return next(errorHandler(null, 401, "Auth failed"))
        const token = await JwtSignPromise(user.email, user._id)
        if (!token) return next(errorHandler(null, 401, "Token generation fails"))
        //user[token] = token;
        const { password, ...other } = user._doc
        return { ...other, token }
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}