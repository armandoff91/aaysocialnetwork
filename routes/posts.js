const express = require("express");
const router = express.Router()
const Cache = require("../services/postCache")

var cache = new Cache()

cache.init()
cache.updateCycle()


router
    .route("/")
    .get((req, res) => {
        cache.findOne(req.query.postId, (numberOfPosts, post) => {
            if (numberOfPosts === 1) {
                res.json(post)
                return
            } 
            res.json({msg: "no post found"})
        })
})

router
    .route("/postList")
    .get((req, res) => {
        res.json({postList: cache.getPostList()})
})


router
    .route("/newPost")
    .post((req, res) => {
        console.log("new post request received")
        if (req.body.body.length > 0) {
            const newPost =  {
                authorId: req.user,
                title: req.body.title,
                body: req.body.body
            }
            cache.createPost(newPost,(savedPost) => {
                console.log("new post saved")
                res.send(JSON.stringify(savedPost))
            })
        } else {
            res.json({msg: "Error: Could not save an empty post."})
        }
})

router
    .route("/newComment")
    .post((req, res) => {
        console.log("new comment request received")
        if (req.body.body.length > 0) {    
            const newComment =  {
                authorId: req.user,
                postId: req.body.postId,
                body: req.body.body
            }           
            cache.createComment(newComment,(updatedPost) => {
                res.send(JSON.stringify(updatedPost))
            })
        } else {
            res.json({msg: "Could not save an empty comment."})
        }
})

router
    .route("/newReply")
    .post((req, res) => {
        console.log("new reply request received")
        if (req.body.body.length > 0) {
            const newReply = {
                authorId: req.user,
                postId: req.body.postId,
                commentId: req.body.commentId,
                body: req.body.body
            }
            cache.createReply(newReply, (updatedPost) => {
                console.log("new reply saved")
                res.send(JSON.stringify(updatedPost))
            })
        } else {
            res.json({msg: "Could not save an empty reply."})
        }
    })

router
    .route("/deletePost")
    .post((req, res) => {
        console.log("delete post request received")
        const deletion = {
            userId: req.user,
            postId: req.body.postId
        }
        cache.deletePost(deletion, (message) => {
            res.send(JSON.stringify(message))
        })
})

router
    .route("/deleteComment")
    .post((req, res) => {
        console.log("delete comment request received")
        const deletion = {
            userId: req.user,
            postId: req.body.postId,
            commentId: req.body.commentId,
        }
        cache.deleteComment(deletion, (updatedPost) => {
            res.send(JSON.stringify(updatedPost))
        })
})

router
    .route("/deleteReply")
    .post((req, res) => {
        console.log("delete reply request received")
        const deletion = {
            userId: req.user,
            postId : req.body.postId,
            commentId : req.body.commentId,
            replyId : req.body.replyId
        }
        cache.deleteReply(deletion, (updatedPost) => {
            res.send(JSON.stringify(updatedPost))
        })
    })

router
    .route("/editPost")
    .post((req, res) => {
        console.log("update post request received.")
        const update = {
            authorId: req.user,
            postId: req.body.postId,
            body: req.body.body
        }
        cache.updatePost(update, (updatedPost) => {
            res.send(JSON.stringify(updatedPost))
        })
})

router
    .route("/editComment")
    .post((req, res) => {
        console.log("update Comment request received.")
        const update = {
            authorId: req.user,
            postId: req.body.postId,
            commentId: req.body.commentId,
            body: req.body.body
        }
        cache.updateComment(update, (updatedPost) => {
            res.send(JSON.stringify(updatedPost))
        })
})

router
    .route("/editReply")
    .post((req, res) => {
        console.log("edit reply request received")
        const update = {
            authorId: req.user,
            postId: req.body.postId,
            commentId: req.body.commentId,
            replyId: req.body.replyId,
            body: req.body.body
        }
        cache.updateReply(update, (updatedPost) => {
            res.send(JSON.stringify(updatedPost))
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