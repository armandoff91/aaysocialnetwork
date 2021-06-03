const mongoose = require("mongoose")
const schemas = require("./schemas/schemas")
const postSchema = schemas.postSchema

const Post = mongoose.model("Post", postSchema)

function queryPost(condition, callback) {
    

    Post.find(condition.filter, condition.projection, condition.option)
    .then((result) => {
        console.log(`queryPost : ${result.length} posts found`)
        callback(result)
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = queryPost