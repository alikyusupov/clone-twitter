const { JwtVerifyPromise } = require("../utils/jwt/jwtVerifyPromise")
const { errorHandler } = require("../utils/error/errorHandler")

exports.isAuth = (req, res, next) => {
    JwtVerifyPromise(req)
        .then(() => next())
        .catch(err => next(errorHandler(err, 401, "Вы не авторизованы")))
}
