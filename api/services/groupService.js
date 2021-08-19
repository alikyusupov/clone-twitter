const Conversation = require("../models/Conversation")
const { errorHandler } = require("../utils/error/errorHandler")

exports.createGroup = async (req, next) => {
    try {
        const newGroup = new Conversation({
            members: [req.body.senderId],
            isGroup: true,
            groupName: req.body.groupName,
        });
        const savedGroup = await newGroup.save();
        return savedGroup
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.getGroup = async (req, next) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.userId] },
            isGroup: true,
        });
        return conversations
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.addMember = async (req, next) => {
    try {
        // check if user is already in a group
        const user = await Conversation.find({
            groupName: req.body.groupName,
            members: {
                $in: [req.params.userId]
            }
        })
        if (user)
            return { message: "User already in group" }
        // add a user
        await Conversation.findOneAndUpdate(
            {
                groupName: req.body.groupName,
            },
            {
                $push: { members: req.params.userId },
            }
        );
        return { message: "User has been added in group" }
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}