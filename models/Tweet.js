const mongoose = require("mongoose")
const tweetSchema = mongoose.Schema({
    authorID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
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
        avatarUrl:{
            type:String,
        },
        desc:{
            type:String
        }
    }]
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Tweet", tweetSchema)
