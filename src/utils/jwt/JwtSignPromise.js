const jwt = require("jsonwebtoken")
const path = require("path")
const fs = require("fs")

exports.JwtSignPromise = (email, userID)=>{
    const privateKey = fs.readFileSync(path.resolve("auth","jwtRS256.key"))
    return new Promise((resolve, reject)=>{
        jwt.sign({email, userID},
            privateKey,
            {algorithm:"RS256",expiresIn:"1h"},
            (err, token)=>{
                err ? reject(err) : resolve(token)
            }
        )
    })
}
