const Conversation = require("../models/Conversation")
const { errorHandler } = require("../utils/error/errorHandler")

exports.createConversation = async (req, next) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.recieverId],
    });
    try {
        const savedConversation = await newConversation.save();
        return savedConversation
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.getConversation = async (req, next) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.userId] },
            isGroup: req.params.isGroup
        });
        return conversations
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}