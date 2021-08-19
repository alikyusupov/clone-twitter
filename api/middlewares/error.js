exports.errorHandler = (err, req, res, next) => {
    console.log(res)
    return res.status(err.statusCode).json({
        message: err.message,
        errors: err.errors
    })
}
