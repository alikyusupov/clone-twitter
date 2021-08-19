const messageService = require("../services/messageService");
const { errorHandler } = require("../utils/error/errorHandler")

exports.createMessage = async (req, res, next) => {
    try {
        const result = await messageService.createMessage(req, next)
        if (result)
            res.status(201).json({ message: "Message is created!" })
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.getMessages = async (req, res, next) => {
    try {
        const result = await messageService.getMessages(req, next)
        if (result)
            res.status(201).json(result)
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}