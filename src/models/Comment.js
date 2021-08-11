const mongoose = require("mongoose")
const CommentSchema = mongoose.Schema(
    {
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    tweetID:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})


module.exports = mongoose.model("Comment", CommentSchema)