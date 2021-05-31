const postSchema = require("./schemas/postSchema")
const mongoose = require("mongoose")


const Post = mongoose.model("Post", postSchema)

async function updatePost(filter, update = {}, callback) {

    const postCount = await Post.countDocuments(filter)
    .then((count) => {
        if (count === 0) throw "_id not found"
        console.log("document founded")
        return count
    })
    
    console.log(postCount)
    if (postCount > 0) {
        Post.findOneAndUpdate(filter, update, {new: true})
        .then((updatedPost) => {
            console.log("update done")
            callback(updatedPost)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}


module.exports = updatePost;
// find out how to query comments