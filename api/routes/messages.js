const router = require("express").Router();
const { isAuth } = require("../middlewares/isAuth");
const express = require("express")
const messageController = require("../controllers/messageController")

//add
router.post("/", express.json({limit:"50mb"}), isAuth, messageController.createMessage)

//get
router.get("/:conversationId", isAuth, messageController.getMessages)

module.exports = router;
