const { Schema, model } = require("mongoose");

const Message = new Schema({
    body:{
        type:String,
        required:true
    },
    path:{
        type:String
    },
    time:{
        type:String
    },
    username:{
        type:String,
        default:" "
    },
    isMine:{
        type:Boolean
    }
},
{
    timestamps:true
})

const Chat = new Schema({
    creatorID:{
        type:Schema.Types.ObjectId
    },
    userID:{
        type:Schema.Types.ObjectId
    },
    messages: [Message]
});

module.exports = model("Chat", Chat);
 