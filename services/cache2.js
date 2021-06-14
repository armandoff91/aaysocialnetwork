const mongoose = require("mongoose")

const queryPost = require("../dbServices/queryPost")
const createPost = require("../dbServices/createPost")
const schemas = require("../dbServices/schemas/schemas")
const createComment = require("../dbServices/createComment")

const Post = mongoose.model("Post", schemas.postSchema)
const Comment = mongoose.model("Comment", schemas.commentSchema)

class Cache {
    constructor() {
        console.log("cache constructed")
        this.body = {}
        this.updateQueue = []
    }

    pushOne(object) {
        if (typeof object != "object") {
            throw "input is not an single object, try .pushMany"
        }
        this.body[object.id] = object
    }

    pushMany(array) {
        if (Array.isArray(array) == false) {
            throw "input is not an array, try .pushOne"
        }
        for (var i in array) {
            this.body[array[i].id] = array[i]
        }
    }
    
    isInCache(postId) {
        return typeof this.body[postId] != "undefined"
    }

    updateDb() {
        for(var i in this.updateQueue) {
            this.body[this.updateQueue[i]].save().then((savedPost)=> {
                if(savedPost === this.body[this.updateQueue[i]]) {
                    this.updateQueue.splice(i, 1)
                    console.log("updateQueue: " + this.updateQueue)
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    // when updating DB: want to abandon the first .save() of the same post if the 2nd .save() is initiated

    findOne(postId, callback) {
        console.log("findOne called")
        if (this.isInCache(postId)) {
            console.log (`${postId} found in cache, sending to router...`)
            callback(this.body[postId])
        } else {
            console.log(`${postId} not in cache, retriving from db...`)
            queryPost({filter: {_id: postId}}, (numberOfPosts, posts) => {
                if (numberOfPosts === 0) {throw "no posts found"}
                this.pushMany(posts)
                console.log(this.body[postId])
                callback(this.body[postId])
            })
        }
    }

    createPost(post, callback = () => {}) {
        console.log("createPost called")
        const newPost = new Post({
            authorId: post.authorId,
            title: post.title,
            body: post.body,
            date: Date.now(),
            lastUpdate: Date.now()
        })
        this.body[newPost.id] = newPost
        this.updateQueue.push(newPost.id)
        callback(newPost)
    }
    
    createComment(comment, post, callback = () => {}) {
        console.log("cache.createComment called")
        const newComment = new Comment({
            authorId: comment.authorId,
            body: comment.body,
            date: Date.now(),
            lastUpdate: Date.now()
        })
        post.comments.unshift(newComment)
        post.lastUpdate = Math.max(newComment.lastUpdate, post.lastUpdate)
        this.updateQueue.push(newCommentId)
    }
}

module.exports = Cache