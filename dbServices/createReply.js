const mongoose = require("mongoose")
const queryPost = require("./queryPost")
const schemas = require("./schemas/schemas")
const postSchema = schemas.postSchema
const commentSchema = schemas.commentSchema
const replySchema = schemas.replySchema

const Post = mongoose.model("Post", postSchema)
const Reply = mongoose.model("Reply", replySchema)

function createReply(reply, callback) {
    const newReply = new Reply ({
        authorId: reply.authorId,
        body: reply.body,
        date: Date.now(),
        lastUpdate: Date.now()
    })
    Post.findById(reply.postId, (err, post) => {
        if (err)  {
            console.log(err)
            return
        }
        for (var i in post.comments) {
            if (post.comments[i].id === reply.commentId) {
                
                break
            }
        }
        post.save().then((updatedPost) => {
            callback(updatedPost)
        }).catch((err) => {
            console.log(err)
        })
    })
}

module.exports = createReply