const conversationService = require("../services/conversationService");
const { errorHandler } = require("../utils/error/errorHandler")


exports.createConversation = async (req, res, next) => {
    try {
        const result = await conversationService.createConversation(req, next)
        if (result)
            res.status(201).json({ message: "Conversation has been created" })
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.getConversation = async (req, res, next) => {
    try {
        const result = await conversationService.getConversation(req, next)
        if (result)
            res.status(200).json(result);
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}