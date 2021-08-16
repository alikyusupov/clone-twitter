const mongoose = require("mongoose")
require("dotenv").require()
exports.connectDB = () => {
    return mongoose.connect(`${process.env.MONGODB_URI}${process.env.MONGODB_NAME}${process.env.MONGODB_OPTIONS}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex:true
        }
    )
}
