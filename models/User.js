const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")/*check for duplicate database entries 
and report them just like any other validation error*/ 
const userSchema = mongoose.Schema({
    email:{
        type:String, 
        required:true, 
        trim:true,
        unique: true
    },
    password:{
        type:String, 
        required:true,
        trim:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    lastname:{
        type:String
    },
    DOB:{
        type:Date,
        default: new Date(2000, 0, 1)
    },
    profileDesc:{
        type:String,
        maxLength:200,
        minLenght:10,
        default:"Hello Twitter!"
    },
    avatarURL:{
        type:String,
        default:"default url"
    },
    tweets:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet"
    }],
    followed:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
},
{
    timestamps: true
}
)
userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
module.exports = mongoose.model("User", userSchema);
