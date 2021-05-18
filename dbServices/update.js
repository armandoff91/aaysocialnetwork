const postSchema = require("./schemas/postSchema")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

const Post = mongoose.model("Post", postSchema)

const filter = {author_id: 0001}
const update = {body: "No, this post is actually bad."}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("db connected")
    // check if query returns one result only
    Post.countDocuments(filter)
    .then((count) => {
        console.log(count)
    })
    .catch((err) => {
        console.log(err)
    })
    // if yes, call findOneAndUpdate
    // if no, return number of results and error message
});

// find out how to query comments