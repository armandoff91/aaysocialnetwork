const mongoose = require("mongoose")
const schemas = require("./schemas/schemas")
const postSchema = schemas.postSchema

const Post = mongoose.model("Post", postSchema)

function queryPost(req, callback) {
    

    Post.find(req.filter, req.projection, req.option)
    .then((result) => {
        console.log(`queryPost : ${result.length} posts found`)
        callback(result)
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = queryPost