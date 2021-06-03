const mongoose = require("mongoose")
const schemas = require("./schemas/schemas")
const postSchema = schemas.postSchema
const commentSchema = schemas.commentSchema

const Comment = mongoose.model("Comment", commentSchema)

function updateComment (comment, callback) {
    const update = {
        body: comment.body,
        lastUpdate: Date.now()
    }
    Comment.findOneAndUpdate({_id: {$eq: comment.commentId}}, update, {useFindAndModify:true}, (updatedComment) => {
        console.log(updatedComment)
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = updateComment