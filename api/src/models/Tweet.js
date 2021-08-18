const mongoose = require("mongoose")
const tweetSchema = mongoose.Schema({
    authorID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true
    },
    id:{
        type:String,
    },
    desc:{
        type:String,
        default:"Some description..."
    },
    avatarUrl:{
        type:String,
        default:"default path"
    },
    likeCount:{
        type: Number
    },
    imagePath:{
        type: String
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Tweet", tweetSchema)
