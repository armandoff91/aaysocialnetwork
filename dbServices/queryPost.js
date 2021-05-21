const mongoose = require("mongoose")
const connect = require("./connect")
const postSchema = require("./schemas/postSchema")

const Post = mongoose.model("Post", postSchema)

function queryPost(condition, callback) {
    connect(() => {
        Post.find(condition)
        .then((result) => {
            console.log(result)
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