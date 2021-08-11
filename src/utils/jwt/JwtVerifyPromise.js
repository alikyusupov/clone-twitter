const jwt = require("jsonwebtoken")
const path = require("path")
const fs = require("fs")

exports.JwtVerifyPromise =  req =>{
    const token = fs.readFileSync(path.resolve("src","auth","jwtRS256.key.pub"),{encoding:"utf8"})
    const clientToken = req.headers.authorization.split(" ")[1]
    return new Promise((resolve, reject)=>{
        jwt.verify(clientToken, token, (err, data)=>{
            err ? reject(err) : resolve(data)
        })
    })
}
