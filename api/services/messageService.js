const Message = require("../models/Message");
const { errorHandler } = require("../utils/error/errorHandler")

exports.createMessage = async (req, next) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.getMessages = async (req, next) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        return messages
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}