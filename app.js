const express = require("express")
const app = express()
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const tweetsRoutes = require('./routes/tweet')
const {errorHandler} = require("./middleware/apiError")
const cors = require('cors')

app.use(cors())
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/tweets", tweetsRoutes)
app.use(errorHandler)

module.exports = app
