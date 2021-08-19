const router = require("express").Router();
const { isAuth } = require("../middlewares/isAuth");
const express = require("express")
const userController = require("../controllers/userController")

//update user
router.put("/:id",
    express.json(), 
    isAuth, 
    userController.updateUser)	

//delete user
router.delete("/:id", 
    express.json(), 
    isAuth, 
    userController.deleteUser)

//get a user
router.get("/", 
    isAuth, 
    userController.getUser)

// get followers
router.get("/followers/:userId", 
    isAuth, 
    userController.getFollowers)

//follow a user
router.put("/:id/follow", 
    express.json(), 
    isAuth, 
    userController.follow)

//unfollow a user
router.put("/:id/unfollow",
    express.json(),
     isAuth, 
     userController.unfollow)


module.exports = router;