

const { errorHandler } = require("../utils/error/errorHandler")
const postService = require("../services/postService")

//create a post
exports.createPost = async (req, res, next) => {
    try {
        const result = await postService.createPost(req, next)
        if (result)
            res.status(201).json({ message: "Post is created" })
    }
    catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}
//update a post
exports.updatePost = async (req, res, next) => {
    try {
        const result = await postService.updatePost(req, next)
        if (result)
            res.status(201).json({ message: result.message })
    }
    catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}
//delete
exports.deletePost = async (req, res, next) => {
    try {
        const result = await postService.deletePost(req, next)
        if (result)
            res.status(201).json({ message: result.message })
    }
    catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}


//like / dislike a post
exports.like_dislike = async (req, res, next) => {
    try {
        const result = await postService.like_dislike(req, next)
        if (result)
            res.status(201).json({ message: result.message })
    }
    catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

//get a post
exports.getPost = async (req, res, next) => {
    try {
        const result = await postService.getPost(req, next)
        if (result)
            res.status(201).json(result)
    }
    catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

//get timeline posts
exports.getTimeline = async (req, res, next) => {
    try {
        const result = await postService.getTimeline(req, next)
        if (result)
            res.status(201).json(result)
    }
    catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

//get users all posts
exports.getPosts = async (req, res, next) => {
    try {
        const result = await postService.getPosts(req, next)
        if (result)
            res.status(201).json(result)
    }
    catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}
