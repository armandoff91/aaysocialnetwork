const mongoose = require("mongoose")
const schemas = require("./dbServices/schemas/schemas")
const connect = require("./dbServices/connect")
const postSchema = schemas.postSchema
const commentSchema = schemas.commentSchema

const Post = mongoose.model("Post", postSchema)

const update = {
    comments: [commentSchema],
    meta: {upvotes: 0, downvotes: 0},
    __v: 1.01
}

connect(() => {
    Post.findByIdAndUpdate("60a3a62225f2e20367aa2350", update, {new: true}, (updatedPost) => {

        console.log(updatedPost)
        mongoose.connection.close()
    })

})