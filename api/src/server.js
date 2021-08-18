require("dotenv").config()
const app = require("./app")
const path = require("path");
const port = process.env.PORT
const { connectDB } = require("./utils/db/connectDB")
const { unexpectedErrorHandler } = require("./utils/error/unexpectedErrorHandler")
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
require('./socket.js')(io);




app.get("/", (req, res, next) => {
    res.status(200).send("Hello from server!")
});

app.get("/chat", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

connectDB()
    .then(result => {
        console.log("Connected to DB")
        server.listen(port, () => {
            console.log(`Listening on ${port}`);
        });
    })
    .catch(err => {
        unexpectedErrorHandler(err, server)
    })


//Graceful shutdown
process.on("SIGTERM", async () => {
    try {
        await mongoose.connection.close()
        //await server.close()
    } catch (err) {
        console.log(err.message)
    }
    finally {
        process.exit(1)
    }
})
