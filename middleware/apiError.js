exports.errorHandler = (err, req, res, next)=>{
    return res.status(err.statusCode).json({
        message:err.message, 
        errors:err.errors
    })
}
