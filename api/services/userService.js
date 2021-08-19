const User = require("../models/User");
const { errorHandler } = require("../utils/error/errorHandler")
const bcrypt = require("bcrypt")


exports.updateUser = async (req, next) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                next(errorHandler(err, 401, err.message, err.errors))
            }
        }
        try {
            await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            return { message: "Account has been updated" }
        } catch (err) {
            return next(errorHandler(err, 401, err.message, err.errors))
        }
    } else {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}


exports.deleteUser = async (req, next) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            return { message: "Account has been deleted" }
        } catch (err) {
            return next(errorHandler(err, 401, err.message, err.errors))
        }
    } else {
        return { message: "You can delete only your account!" }
    }
}

exports.getUser = async (req, next) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        return other
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}

exports.getFollowers = async (req, next) => {
    try {
        const user = await User.findById(req.params.userId);
        const followers = await Promise.all(
            user.followings.map((followerId) => {
                return User.findById(followerId);
            })
        );
        let followerList = [];
        followers.map((follower) => {
            const { _id, username, profilePicture } = follower;
            followerList.push({ _id, username, profilePicture });
        });
        return followerList
    } catch (err) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}


exports.follow = async (req, next) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                return { message: "user has been followed" }
            } else {
                return { message: "you allready follow this user" }
            }
        } catch (err) {
            return next(errorHandler(err, 401, err.message, err.errors))
        }
    } else {
        return { message: "you cant follow yourself" }
    }
}

exports.unfollow = async (req, next) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                return { message: "user has been unfollowed" }
            } else {
                return { message: "you dont follow this user" }
            }
        } catch (err) {
            return next(errorHandler(err, 401, err.message, err.errors))
        }
    } else {
        return { message: "you cant unfollow yourself" }
    }
}
