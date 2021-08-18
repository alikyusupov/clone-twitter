const express = require("express")
const app = express()
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const tweetsRoutes = require('./routes/tweet')
const imageRoutes = require("./routes/images")
const helmet = require("helmet")
const morgan = require("morgan")
const {errorHandler} = require("./middleware/apiError")
const cors = require('cors')

app.use(cors())
app.use(helmet());
app.use(morgan("common"))
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/tweets", tweetsRoutes)
app.use("/api/images", imageRoutes)
app.use(errorHandler)

module.exports = app
