const postSchema = require("./schemas/postSchema")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

mongoose.connect(process.env.DB_POSTS, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

const Post = mongoose.model("Post", postSchema)
const connect = require("./connect")

const filter = {author_id: 0001}
const update = {body: "No, this post is actually bad."}
//update takes a post's object id and body


function updatePost(filter, update = {}) {
    connect(async function() {

        const postCount = await Post.countDocuments(filter)
        .then((count) => {
            if (count === 0) throw "_id not found"
            console.log("document founded")
            return count
        })
        
        console.log(postCount)
        if (postCount > 0) {
            Post.findOneAndUpdate(filter, update)
            .then(() => {
                console.log("update done")
            })
            .catch(() => {
                
            })
        }
    });
}


module.exports = updatePost;
// find out how to query comments