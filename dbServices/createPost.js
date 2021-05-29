const mongoose = require("mongoose")
const postSchema = require("./schemas/postSchema")
const connect = require("./connect")


const Post = mongoose.model("Post", postSchema)

function createPost(postObject, callback) {
    console.log("db createPost called")
    const newPost = new Post({
        title:  postObject.title,
        author_id: postObject.authorId,
        body:   postObject.body,
        comments: [],
        date: Date.now() ,
        hidden: false,
        meta: {
          votes: 0,
          favs:  0
        }
    })
    
    connect(() => {
        console.log("db connected")
        newPost.save()
        .then((savedDoc) => {
            // further action: check if post is created.
            callback(savedDoc)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() =>
            mongoose.connection.close() 
        )
    })
}

module.exports = createPost;

// further action:
// export a function that accept a post(a js object) then create post in mongodb and return a success or fail message
// solve the date problem

