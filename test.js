const queryPost = require("./dbServices/queryPost")
const connect = require("./dbServices/connect")
const Cache = require("./services/cache2.js")
const createReply = require("./dbServices/createReply")
const createPost = require("./dbServices/createPost")
const createComment = require("./dbServices/createComment")
const schemas = require("./dbServices/schemas/schemas")
const postSchema = schemas.postSchema
const mongoose = require("mongoose")


const Post = mongoose.model("Post", postSchema)



async function test() {
    connect(() => {
        const cache = new Cache()
        cache.createPost({
            authorId: 1001,
            title: "14 June title",
            body: "14 June"
        }, (newPost) => {
            console.log(newPost.id)
            cache.updateDb()
        })    
    })
}

test()