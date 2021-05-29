const mongoose = require("mongoose")
const connect = require("./connect")
const postSchema = require("./schemas/postSchema")

const Post = mongoose.model("Post", postSchema)

function queryPost(condition, callback) {
    connect(() => {
        console.log("db connected")
        Post.find(condition.filter, condition.projection, condition.option)
        .then((result) => {
            console.log(`${result.length} posts found`)
            callback(result)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() =>
            mongoose.connection.close() 
        )
    })
}

module.exports = queryPost