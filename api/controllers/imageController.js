const { errorHandler } = require("../utils/error/errorHandler")
const { getFileStream } = require("../s3");


exports.getImage = async (req, res, next) => {
    try {
        const key = req.params.key;
        const readStream = getFileStream(key);
        readStream.pipe(res);
        res.status(200);
    } catch (e) {
        return next(errorHandler(err, 401, err.message, err.errors))
    }
}