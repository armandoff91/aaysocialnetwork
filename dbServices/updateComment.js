const mongoose = require("mongoose")
const schemas = require("./schemas/schemas")
const postSchema = schemas.postSchema
const commentSchema = schemas.commentSchema
const connect = require("./connect")
const Comment = mongoose.model("Comment", commentSchema)
const Post = mongoose.model("Post", postSchema)

async function updateComment (comment, callback) {
    const post = await Post.findById(comment.postId, (err, foundPost) => {
        if (err) {console.log(err); return}
        console.log(foundPost)
    })

    post.comments.id(comment.commentId).body = comment.body
    
    post.comments.id(comment.commentId).lastUpdate = Math.max(Date.now(), post.comments.id(comment.commentId).lastUpdate)
    post.lastUpdate = Math.max(Date.now(), post.lastUpdate)

    post.save().then((savedDoc) => {
        callback(savedDoc)
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = updateComment


//   testing area

// connect(updateComment({
//     commentId: "60ba202b12e1dc0149f6c7c0",
//     body: "5th June test for update comment",
//     postId: "60a3a645281d27037216c5d8"
// }, (doc) => {
//     console.log(doc.comments.id("60ba202b12e1dc0149f6c7c0"))
// }))