const mongoose = require("mongoose")
const schemas = require("./schemas/schemas")
const postSchema = schemas.postSchema
const commentSchema = schemas.commentSchema

const Post = mongoose.model("Post", postSchema)
const Comment = mongoose.model("Comment", commentSchema)

function createComment (commentObject, callback) {
    const newComment = new Comment({
        authorId: commentObject.authorId,
        body: commentObject.body,
        date: Date.now(),
        lastUpdate: Date.now()
    })
    const update = {
        $push: {comments: newComment},
        lastUpdate: commentObject.lastUpdate
    }
    console.log(newComment)
    Post.findByIdAndUpdate(commentObject.postId, update, {new: true}, (err, updatedPost) => {
        if (err) {
            console.log(err)
            return
        }
        callback(updatedPost)
    })
}

module.exports = createComment