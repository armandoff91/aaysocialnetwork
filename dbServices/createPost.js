const mongoose = require("mongoose")
const schemas = require("./schemas/schemas")
const postSchema = schemas.postSchema


const Post = mongoose.model("Post", postSchema)

function createPost(postObject, callback) {
    console.log("db createPost called")
    const newPost = new Post({
        title:  postObject.title,
        author_id: postObject.authorId,
        body:   postObject.body,
        date: Date.now(),
        lastUpdate: Date.now()
    })
    
    newPost.save()
        .then((savedDoc) => {
            callback(savedDoc)
        })
        .catch((err) => {
            console.log(err)
    })    
}

module.exports = createPost;
