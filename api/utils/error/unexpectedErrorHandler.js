exports.unexpectedErrorHandler = (err,server) =>{
    console.log(err.message)
    if(server)server.close()
    process.exit(1)
}