const createPost = require("../dbServices/createPost")
const queryPost = require("../dbServices/queryPost")
const { post } = require("../dbServices/schemas/postSchema")
const updatePost = require("../dbServices/updatePost")
const deletePost = require("../dbServices/deletePost")


class Cache {
    constructor() {
        this.body = []
    }
    init(numberOfposts = 1000) {
        queryPost({filter: {date: {$gt: Date.now() - 86400000 * 30}}, projection: null,
        option: {
            limit: numberOfposts, 
            sort: {date: -1}
        }}, 
        (posts) => {
            for (var i=0; i<posts.length; i++) {
                this.body.push(posts[i])
            }
            console.log(`cache.init() : ${this.body.length} posts cached`)
        })
    }
    flush() {
        this.body = []
    }
    halfFlush() {
        for (var i=0; i <= 0.5 * this.body.length; i++) {
            this.body.pop()
        }
    }
    show() {
        console.log(this.body)
    }
    size() {
        return this.body.length
    }
    newPost(post, callback = () => {}) {
        console.log("cache accepting new post....")
        // title, author_id, body
        createPost({title: post.title, authorId: post.authorId, body: post.body}, (savedDoc) => {
            // unshift post to cache
            this.body.unshift(savedDoc)
            // 
            callback(savedDoc)
        })
    }

    newComment(comment, callback = () => {}) {
        const update = {
            $push : {comments: {
                authorId : comment.authorId,
                body: comment.body,
            }}
        }
        updatePost({_id: comment.postId}, update, (updatedPost) => {
            console.log(updatedPost.comments)
            for (var i in this.body) {
                if(this.body[i]._id == comment.postId) {
                    console.log(`${comment.postId} deleted from cache`)
                    this.body.splice(i, 1)
                    break
                }
                this.body.unshift(updatedPost)
                console.log(this.body[0])
            }
            callback(updatedPost)
        })
    }

    updatePost(post, callback = () => {}) {
        const update = {
            $push : {comments: {
                authorId : comment.authorId,
                body: comment.body,
            }}
        }
        updatePost({_id: comment.postId}, update, (updatedPost) => {
            console.log(updatedPost.comments)
            for (var i in this.body) {
                if(this.body[i]._id == comment.postId) {
                    console.log(`${comment.postId} deleted from cache`)
                    this.body.splice(i, 1)
                    break
                }
                this.body.unshift(updatedPost)
                console.log(this.body[0])
            }
            callback(updatedPost)
        })
    }

    updateComment(post, callback = () => {}) {

    }

    deletePost(postId, callback = () => {}) {
        deletePost(postId, (deletedPost) => {
            for (var i in this.body) {
                if(this.body[i]._id == postId) {
                    console.log(`${postId} deleted from cache`)
                    this.body.splice(i, 1)
                    break
                }
            }
            callback(deletedPost)
        })
    }

    deleteComment(comment, callback = () => {}) {

    }

    query(conditions, callback = () => {}) {

    }
}

module.exports = Cache