const authService = require("../services/authService")
const { errorHandler } = require("../utils/error/errorHandler")

exports.register = async (req, res, next) => {
    try {
        const result = await authService.register(req, next)
        if (result)
            res.status(201).json({ message: "Account is created!" })
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.login = async (req, res, next) => {
    try {
        const result = await authService.login(req, next)
        if (result)
            res.status(200).json(result)
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}