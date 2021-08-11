const mongoose = require("mongoose")
const config = require("../../../config")

exports.connectDB = () => {
    return mongoose.connect(`mongodb+srv://Alisher:${config.MONGODB.PASSWORD}@dressify-zvh54.mongodb.net/twitter?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    )
}
