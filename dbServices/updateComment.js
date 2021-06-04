const mongoose = require("mongoose")
const schemas = require("./schemas/schemas")
const postSchema = schemas.postSchema
const commentSchema = schemas.commentSchema
const connect = require("./connect")
const Comment = mongoose.model("Comment", commentSchema)

function updateComment (comment, callback) {
    const update = {
        lastUpdate: Date.now(),
        comments: {$set: {body: "update Commnet test 4th June"}}
    }
    Comment.findOneAndUpdate({_id: {$eq: comment.commentId}}, update, {useFindAndModify:true}, (err, updatedComment) => {
        if (err) {console.log(err)}
        callback(updatedComment)
    })
}

module.exports = updateComment