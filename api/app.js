const express = require("express")
const app = express()
const { errorHandler } = require("./middlewares/error")
const cors = require('cors')
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const imageRoute = require("./routes/images");
const conversationRoute = require("./routes/conversations");
const messagesRoute = require("./routes/messages");
const groupRoute = require("./routes/group");


app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/images", imageRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/group", groupRoute);
app.use("/api/messages", messagesRoute);
// hardcode fix
app.use("/api/profile/images", imageRoute);
app.use("/api/profile/users", userRoute);
app.use(errorHandler)


module.exports = app