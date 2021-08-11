exports.apiErrorHandler = (err={}, statusCode, message, errors=[])=>{
    const apiError = new Error(err)
    apiError.statusCode = statusCode
    apiError.message = message
    apiError.errors = errors
    return apiError
}
