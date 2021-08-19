const groupService = require("../services/groupService");
const { errorHandler } = require("../utils/error/errorHandler")


exports.createGroup = async (req, res, next) => {
    try {
        const result = await groupService.createGroup(req, next)
        if (result)
            res.status(201).json({ message: "Group has been created" })
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.getGroup = async (req, res, next) => {
    try {
        const result = await groupService.getGroup(req, next)
        if (result)
            res.status(200).json(result);
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.addMember = async (req, res, next) => {
    try {
        const result = await groupService.addMember(req, next)
        if (result)
            res.status(200).json({ message: result.message });
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}