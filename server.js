const app = require("./app")
const port = process.env.PORT || 3000
const { connectDB } = require("./utils/db/connectDB")
const { unexpectedErrorHandler } = require("./utils/error/unexpectedErrorHandler")
//let server = null;//Значение присвоим после подключения к БД
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
require('./socket.js')(io);
const path = require("path");


app.get("/", (req, res, next) => {
    res.status(200).send("Hello from server!")
});

app.get("/chat", (req, res, next) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
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
