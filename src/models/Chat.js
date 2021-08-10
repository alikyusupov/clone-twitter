const { Schema, model } = require("mongoose");

const Message = new Schema({
    body:{
        type:String,
        required:true
    },
    path:{
        type:String
    },
    isMine:{
        type:Boolean
    }
},
{
    timestamps:true
})

const Chat = new Schema({
    chat_id: { 
        type: String, 
        required: true 
    },
    users: [{
        type: String, 
        required: true 
    }],
    chat_fields: [Message]
});

module.exports = model("Chat", Chat);
 