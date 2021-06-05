const express = require("express");
const router = express.Router()
const expressHandlebars = require("express-handlebars")
const queryPost = require("../dbServices/queryPost")
const Cache = require("../services/cache")

var cache = new Cache()
cache.init()

router
    .route("/")
    .get((req, res) => {
        console.log("get /post reached.")
        console.log(req.query)
        console.log(req.params)
        console.log(req.body)
        res.send(`send JSON　with 10 posts`)
})

router
    .route("/")
    .post((req, res) => {
        console.log("/posts post req received")
        //req.params
        //req.query
        console.log(req.body)
        res.send("post req received")
        // console.log(req.query)
        // console.log(req.params)
})

router
    .route("/newPost")
    .post((req, res) => {
        console.log("new post request received")
        console.log(req.body)
        const newPost =  {
            authorId: req.body.userId,
            title: req.body.title,
            body: req.body.body
        }           
        cache.newPost(newPost,(savedPost) => {
            console.log("post saved")
            res.send(savedPost + "")
        })
})

router
    .route("/newComment")
    .post((req, res) => {
        console.log("new comment request received")
        console.log(req.body)
        const newComment =  {
            authorId: req.body.userId,
            postId: req.body.postId,
            body: req.body.body
        }           
        cache.newComment(newComment,(updatedPost) => {
            console.log("newComment saved")
            res.send(updatedPost + "")
        })
})

router
    .route("/deletePost")
    .post((req, res) => {
        console.log("delete post request received")
        console.log(req.body)
        cache.deletePost(req.body.postId, (deletedPost) => {
            res.send(`${deletedPost._id} deleted`)
        })
})

router
    .route("/deleteComment")
    .post((req, res) => {
        console.log("delete comment request received")
        console.log(req.body)
        cache.deleteComment(req.body.CommentId, (updatedPost) => {
            res.send(updatedPost + "")
        })
})

router
    .route("/updatePost")
    .post((req, res) => {
        console.log("update post request received.")
        console.log(req.body)
        cache.updatePost(req.body, (updatedPost) => {
            res.send(updatedPost + "")
        })
})

router
    .route("/updateComment")
    .post((req, res) => {
        console.log("update Comment request received.")
        console.log(req.body)
        cache.updateComment(req.body, (updatedComment) => {
            res.send(updatedComment + "")
        })
})

router
    .route("/queryPost")
    .post((req, res) => {
        console.log("query post request received.")
        console.log(req.body)
        cache.query(req.body, (result) => {
            res.send(result + "")
        })
})
    

// when receive get request, check cache length
// if cache length = 0, grab post from db

module.exports = router