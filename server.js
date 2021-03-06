const app = require("./app")
const port = process.env.PORT || 3000
const {connectDB} = require("./utils/db/connectDB")
let server = null;//Значение присвоим после подключения к БД

app.get("/", (req, res, next)=>{
    res.status(200).send("Hello from server!")
})

connectDB()
.then(result=>{
    console.log("Connected to DB")
	server = app.listen(port,()=>{
		console.log(`Listening on ${port}`);
	});
})
.catch(err=>{
	console.log(err)
})

//Graceful shutdown
process.on("SIGTERM",async()=>{
    try{
        await mongoose.connection.close()
        await server.close()
    }catch(e){
        console.log(e)
    }
    finally{
        process.exit(1)
    }
})
