const router = require("express").Router();
const { isAuth } = require("../middlewares/isAuth");
const express = require("express")
const postController = require("../controllers/postController")

//create a post
router.post("/", express.json(), isAuth, postController.createPost)

//update a post
router.put("/:id", express.json(), isAuth, postController.updatePost)


//delete a posta
router.delete("/:id", express.json(), isAuth, postController.deletePost)


//like / dislike a post
router.put("/:id/like", express.json(), isAuth, postController.like_dislike)


//get a post
router.get("/:id", isAuth, postController.getPost)


//get timeline posts
router.get("/timeline/:userId", isAuth, postController.getTimeline)


//get users all posts
router.get("/profile/:username", isAuth, postController.getPosts)


module.exports = router;
