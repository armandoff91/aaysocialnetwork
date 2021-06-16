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
    const cache = new Cache()
    cache.updateCycle()
    connect(() => {
        cache.deleteReply({
            postId: "60a3a62225f2e20367aa2350",
            commentId: "60c747e61673180082642b29",
            replyId: "60c9faa5a7187002fac8df03",
        }, () => {
            
        })    
    })
}

test()