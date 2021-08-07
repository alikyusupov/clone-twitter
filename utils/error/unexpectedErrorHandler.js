exports.unexpectedErrorHandler = server =>{
    if(server){
        server.close(()=>process.exit(1))
    }else{
        process.exit(1)
    }
}