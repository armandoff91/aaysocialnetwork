const mongoose = require("mongoose")
const queryPost = require("./queryPost")
const schemas = require("./schemas/schemas")
const postSchema = schemas.postSchema
const commentSchema = schemas.commentSchema
const replySchema = schemas.replySchema

const Post = mongoose.model("Post", postSchema)
const Comment = mongoose.model("Comment", commentSchema)
const Reply = mongoose.model("Reply", replySchema)

function createReply(reply, callback) {
    const newReply = new Reply ({
        authorId: reply.authorId,
        body: reply.body,
        date: Date.now(),
        lastUpdate: Date.now()
    })
    // you dont want to queryPost each time you add a comment, not a good practice
    queryPost({filter: {_id: reply.postId}}, (numberOfPosts, posts) => {
        console.log(posts[0].comments)
        for (var i in posts[0].comments) {
            if (posts[0].comments[i].id === reply.commentId) {
                posts[0].comments[i].replies.push(newReply)
                break
            }
        }
        // posts[0].comments[reply.commentId].replies.push(newReply)
        posts[0].save().then((updatedPost) => {
            callback(updatedPost)
        }).catch((err) => {
            console.log(err)
        })
    })
}

module.exports = createReply