const User = require("../models/User")
const Chat = require("../models/Chat")
const {apiErrorHandler} = require("../utils/error/apiErrorHandler")


exports.postChat = async (req, next)=>{
    try{
        const {userID, creatorID} = req.body
        const chat = new Chat({creatorID,userID})
        const chatResult =  await chat.save()
        await User.findByIdAndUpdate(userID,{$push:{"chats":chatResult._id}}).exec()
        await User.findByIdAndUpdate(creatorID,{$push:{"chats":chatResult._id}}).exec()
        return chatResult
    }catch(err){
        return next(apiErrorHandler(err, 401, err.message))
    }
}