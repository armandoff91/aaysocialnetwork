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
    queryPost({filter: {_id: "60a3a62225f2e20367aa2350"}}, (numberOfPost, doc1) =>{
        cache.pushOne(doc1[0])
        cache.createComment({
            authorId: 1001,
            body: "13 June testing new method haha 1"
        }, doc1[0])
        cache.createComment({
            authorId: 1001,
            body: "13 June testing new method haha 2"
        }, doc1[0])
        cache.createComment({
            authorId: 1001,
            body: "13 June testing new method haha 3"
        }, doc1[0])
        cache.body[doc1[0].id].save().then((savedDoc) => {
            cache.pushOne(savedDoc)
            console.log(cache.body[savedDoc.id] === savedDoc)
        })
    })})
}

test()