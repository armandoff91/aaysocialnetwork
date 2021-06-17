const mongoose = require("mongoose")

const queryPost = require("../dbServices/queryPost")
const createPost = require("../dbServices/createPost")
const schemas = require("../dbServices/schemas/schemas")
const createComment = require("../dbServices/createComment")

const Post = mongoose.model("Post", schemas.postSchema)
const Comment = mongoose.model("Comment", schemas.commentSchema)
const Reply = mongoose.model("Reply", schemas.replySchema)

class Cache {
    constructor() {
        console.log("cache constructed")
        this.body = {}
        this.updateQueue = []
        this.deleteQueue = []
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

    addToUpdateQueue(postId) {
        if (typeof postId != "string") {
            console.log("postId is not a string, cannot add to Update Queue")
            return
        }
        if (this.updateQueue.includes(postId)) {
            console.log(`${postId} already in update queue`)
            return
        }
        this.updateQueue.push(postId)
    }

    addToDeleteQueue(postId) {
        if (typeof postId != "string") {
            console.log("postId is not a string, cannot add to delete Queue")
            return
        }
        if (this.deleteQueue.includes(postId)) {
            console.log(`${postId} already in delete queue`)
            return
        }
        this.deleteQueue.push(postId)
        console.log(this.deleteQueue)
    }

    writeToDb() {
        for(var i in this.updateQueue) {
            try {this.body[this.updateQueue[i]].save().then((savedPost)=> {
                if(savedPost === this.body[this.updateQueue[i]]) {
                    this.updateQueue.splice(i, 1)
                }
            }).catch((err) => {
                console.log(err)
            })}
            catch (err) {
                console.log(err)
                this.updateQueue.splice(i, 1)
            }
        }
    }

    deleteFromDb() {
        for (var i in this.deleteQueue) {
            Post.findByIdAndDelete(this.deleteQueue[i], (err, deletedDoc) => {
                if (err) {console.log(err)}
                this.deleteQueue.splice(i, 1)
                try {
                    console.log(deletedDoc.id + " is removed")
                } catch (err) {
                    console.log(this.deleteQueue[i] + " not found. Cannot delete")
                }
            })
        }
    }

    // when updating DB: want to abandon the first .save() of the same post if the 2nd .save() is initiated
    updateCycle(timeInterval = 10000) {
        setInterval(() => {
            this.writeToDb()
            this.deleteFromDb()
            console.log("updateQueue: " + this.updateQueue)
            console.log("deleteQueue: " + this.deleteQueue)
            console.log(this.body)
        }, timeInterval)
    }

    findOne(postId, callback) {
        console.log("findOne called")
        if (this.isInCache(postId)) {
            console.log (`${postId} found in cache, sending to router...`)
            callback(this.body[postId])
        } else {
            console.log(`${postId} not in cache, retriving from db...`)
            queryPost({filter: {_id: postId}}, (numberOfPosts, posts) => {
                this.pushMany(posts)
                callback(numberOfPosts, this.body[postId])
            })
        }
    }

    createPost(request, callback = () => {}) {
        console.log("createPost called")
        const newPost = new Post({
            authorId: request.authorId,
            title: request.title,
            body: request.body,
            date: Date.now(),
            lastUpdate: Date.now()
        })
        this.pushOne(newPost)
        this.addToUpdateQueue(newPost.id)
        callback(newPost)
    }
    
    createComment(request, callback = () => {}) {
        console.log("cache.createComment called")
        this.findOne(request.postId, (numberOfPosts) => {
            if (numberOfPosts === 0) {
                console.log("no post found, cannot create comment");
                callback(numberOfPosts, this.body[request.postId]);
                return
            }
            const newComment = new Comment({
                authorId: request.authorId,
                body: request.body,
                date: Date.now(),
                lastUpdate: Date.now()
            })
            this.body[request.postId].comments.unshift(newComment)
            this.body[request.postId].lastUpdate = Math.max(newComment.lastUpdate, this.body[request.postId].lastUpdate)
            this.addToUpdateQueue(request.postId)
            callback(numberOfPosts, this.body[request.postId])
        })
    }

    createReply(request, callback = () => {}) {
        console.log("cache.createReply called")
        this.findOne(request.postId, () => {
            const newReply = new Reply({
                authorId: request.authorId,
                body: request.body,
                date: Date.now(),
                lastUpdate: Date.now()
            })
            var targetPost = this.body[request.postId]
            for (var i in this.body[request.postId].comments) {
                if (this.body[request.postId].comments[i].id === request.commentId) {
                    var targetComment = this.body[request.postId].comments[i]
                    break
                }
            }
            if (typeof targetComment === "undefined") {throw "no comment found, cannot create reply."}
            targetComment.replies.unshift(newReply)
            targetPost.lastUpdate = Math.max(newReply.lastUpdate, targetPost.lastUpdate)
            this.addToUpdateQueue(request.postId)
            callback(this.body[request.postId])
        })
    }

    updatePost(request, callback = () => {}) {
        this.findOne(request.postId, ()=> {
            console.log("cache.updatePost called")
            const targetPost = this.body[request.postId]
            targetPost.body = request.body
            targetPost.lastUpdate = Math.max(Date.now(), targetPost.lastUpdate)
            this.addToUpdateQueue(targetPost.id)
            callback(targetPost)
        })
    }

    updateComment(request, callback = () => {}) {
        console.log("cache.updateComment called")
        this.findOne(request.postId, ()=> {
            var targetPost = this.body[request.postId]
            for (var i in targetPost.comments) {
                if (targetPost.comments[i].id === request.commentId) {
                    var targetComment = this.body[request.postId].comments[i]
                    break
                }
            }
            if (typeof targetComment === "undefined") {throw "no comment found, cannot update comment"}
            targetComment.body = request.body
            targetComment.lastUpdate = Math.max(Date.now(), targetComment.lastUpdate)
            targetPost.lastUpdate = Math.max(Date.now(), targetPost.lastUpdate)
            this.addToUpdateQueue(targetPost.id)
            callback(targetPost)    
        })
    }

    updateReply(request, callback = () => {}) {
        console.log("cache.updateReply called")
        this.findOne(request.postId, () => {
                
            var targetPost = this.body[request.postId]
            for (var i in targetPost.comments) {
                if (this.body[request.postId].comments[i].id === request.commentId) {
                    console.log("comment found")
                    var targetComment = this.body[request.postId].comments[i]
                    for (var j in targetComment.replies) {
                        if (targetComment.replies[j].id === request.replyId) {
                            console.log("reply found")
                            var targetReply = targetComment.replies[j]
                            break
                        }
                    }
                    break
                }
            }
            if (typeof targetReply === "undefined") {throw "no reply found, cannot update reply"}
            targetReply.body = request.body
            targetReply.lastUpdate = Math.max(Date.now(), targetReply.lastUpdate)
            targetComment.lastUpdate = Math.max(Date.now(), targetComment.lastUpdate)
            targetPost.lastUpdate = Math.max(Date.now(), targetPost.lastUpdate)
            this.addToUpdateQueue(targetPost.id)
            callback(targetPost)
        })
    }

    deletePost(request, callback = () => {}) {
        console.log("cache.deletePost called")
        if(this.isInCache(request.postId)) {
            delete this.body[request.postId]
        }
        this.addToDeleteQueue(request.postId)
        callback()
    }

    deleteComment(request, callback = () => {}) {
        this.findOne(request.postId, () => {
            console.log("deleting comment")
            for (var i in this.body[request.postId].comments) {
                if (this.body[request.postId].comments[i].id === request.commentId) {
                    this.body[request.postId].comments.splice(i, 1)
                    console.log(this.body[request.postId].comments.length)
                    this.addToUpdateQueue(request.postId)
                    break
                }
            }
            callback(this.body[request.postId])
            return
        })
    }

    deleteReply(request, callback = () => {}) {
        this.findOne(request.postId, () => {
            var deleted = false
            var targetPost = this.body[request.postId]
            for (var i in targetPost.comments) {
                if (this.body[request.postId].comments[i].id === request.commentId) {
                    console.log("comment found")
                    var targetComment = this.body[request.postId].comments[i]
                    for (var j in targetComment.replies) {
                        if (targetComment.replies[j].id === request.replyId) {
                            console.log("reply found")
                            targetComment.replies.splice(j, 1)
                            deleted = true
                            break
                        }
                    }
                    break
                }
            }
            if (deleted === false) {throw "no reply found, cannot delete reply"}
            this.addToUpdateQueue(targetPost.id)
            callback(targetPost)
        })
    }
}

module.exports = Cache