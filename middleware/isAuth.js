const {JwtVerifyPromise} = require("../utils/jwt/JwtVerifyPromise")
const {apiErrorHandler} = require("../utils/error/apiErrorHandler")

exports.isAuth = (req, res, next)=>{
    JwtVerifyPromise(req)
    .then(()=>next())
    .catch(err=>next(apiErrorHandler(err, 401, "Вы не авторизованы")))
}
