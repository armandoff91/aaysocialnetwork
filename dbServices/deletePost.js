const schemas = require("./schemas/schemas")
const postSchema = schemas.postSchema
const mongoose = require("mongoose")

const Post = mongoose.model("Post", postSchema)

async function deletePost(postId, callback) {

    const postCount = await Post.countDocuments({_id: postId})
    .then((count) => {
        if (count === 0) throw "_id not found"
        console.log("deletePost : document founded")
        return count
    })

    if (postCount > 0) {
        Post.findOneAndDelete({ _id: postId })
        .then((deletedPost) => {
            console.log(`${postId} deleted`)
            callback(deletedPost)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}


module.exports = deletePost;