const mongoose = require("mongoose")
const schemas = require("./schemas/schemas")
const userSchema = schemas.postSchema

const User = mongoose.model("User", schemas.userSchema)

function queryUser(req, callback) {
    console.log("queryUser called")

    User.find(req.filter, req.projection, req.option)
    .then((result) => {
        console.log(`queryPost : ${result.length} users found`)
        callback(result.length, result)
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = queryUser