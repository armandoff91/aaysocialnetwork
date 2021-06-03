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
    })
    
    newPost.save()
        .then((savedDoc) => {
            // further action: check if post is created.
            callback(savedDoc)
        })
        .catch((err) => {
            console.log(err)
    })    
}

module.exports = createPost;

// further action:
// export a function that accept a post(a js object) then create post in mongodb and return a success or fail message
// solve the date problem

