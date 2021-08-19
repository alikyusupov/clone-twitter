const { errorHandler } = require("../utils/error/errorHandler")
const userService = require("../services/userService")

exports.updateUser = async (req, res, next) => {
    try {
        const result = await userService.updateUser(req, next)
        if (result)
            res.status(200).json({ message: "Account has been updated" })
    }
    catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))

    }
}


exports.deleteUser = async (req, res, next) => {
    try {
        const result = await userService.deleteUser(req, next)
        if (result)
            res.status(200).json({ message: result.message })
    }
    catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))

    }
}

exports.getUser = async (req, res, next) => {
    try {
        const result = await userService.getUser(req, next)
        if (result)
            res.status(200).json(result)
    }
    catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))

    }
}

exports.getFollowers = async (req, res, next) => {
    try {
        const result = await userService.getFollowers(req, next)
        if (result)
            res.status(200).json(result)
    }
    catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))

    }
}

exports.follow = async (req, res, next) => {
    try {
        const result = await userService.follow(req, next)
        if (result)
            res.status(200).json({ message: result.message })
    }
    catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))

    }
}

exports.unfollow = async (req, res, next) => {
    try {
        const result = await userService.unfollow(req, next)
        if (result)
            res.status(200).json({ message: result.message })
    }
    catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))

    }
}