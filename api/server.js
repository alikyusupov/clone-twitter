require("dotenv").config();
const app = require("./app")
const port = process.env.PORT || 3000
const { connectDB } = require("./utils/db/connectDB")
const { unexpectedErrorHandler } = require("./utils/error/unexpectedErrorHandler")

let server = null;

connectDB()
    .then(result => {
        console.log("Connected to DB")
        server = app.listen(port, () => {
            console.log(`Listening on ${port}`);
        });
    })
    .catch(err => {
        unexpectedErrorHandler(err, server)
    })


//Graceful shutdown
process.on("SIGTERM", async () => {
    try {
        await server.close()
    } catch (err) {
        console.log(err.message)
    }
    finally {
        process.exit(1)
    }
})
