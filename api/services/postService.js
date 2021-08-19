const Post = require("../models/Post");
// const User = require("../models/User");
const { uploadFile } = require('../s3');
const { errorHandler } = require("../utils/error/errorHandler")


exports.createPost = async (req, next) => {
    const newPost = new Post(req.body)
    const savedPost = null;
    try {
        if (!newPost.img) {
            savedPost = await newPost.save();
        } else {
            await uploadFile(req);
            newPost.img = `images/${newPost.postKey}`
            savedPost = await newPost.save();
        }
        return savedPost
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.updatePost = async (req, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            return { message: 'Post has been updated' }
        } else {
            return { message: 'You can update only your post' }
        }
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}


exports.deletePost = async (req, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.deleteOne({ $set: req.body })
            return { message: "Your post has been deleted'" }
        } else {
            return { message: "You can update only your post'" }
        }
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}


exports.like_dislike = async (req, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            return { message: "Post has been liked" }
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            return { message: "Post has been disliked" }
        }
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.getPost = async (req, next) => {
    try {
        const post = await Post.findById(req.params.id)
        return post
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.getTimeline = async (req, next) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const followedPosts = await Promise.all(
            currentUser.followings.map(followedId => {
                return Post.find({ userId: followedId })
            })
        )
        const posts = userPosts.concat(...followedPosts);
        return posts
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.getPosts = async (req, next) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        return posts
    } catch (err) {
        res.status(500).json(err);
    }
}