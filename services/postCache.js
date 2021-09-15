const mongoose = require("mongoose")

const queryPost = require("../dbServices/queryPost")
const schemas = require("../dbServices/schemas/schemas")

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

    init(numberOfposts = 100) {
        queryPost({filter: {}, projection: null,
        option: {
            limit: numberOfposts, 
            sort: {lastUpdate: -1}
        }}, 
        (numberOfPosts, posts) => {
            for (var i=0; i<posts.length; i++) {
                this.body[posts[i].id] = posts[i]
            }
        })
    }

    getPostList() {
        return Object.keys(this.body)
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

    isAuthorized(requestUserId, objectAuthorId) {
        console.log("id1: " + requestUserId, "id2: " + objectAuthorId)
        return requestUserId === objectAuthorId
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
        console.log(postId + " added to update queue.")
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
        console.log(postId + " added to delete queue.")
        this.deleteQueue.push(postId)
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
            // console.log("updateQueue: " + this.updateQueue)
            // console.log("deleteQueue: " + this.deleteQueue)
        }, timeInterval)
    }

    findOne(postId, callback) {
        console.log("findOne called")
        if (this.isInCache(postId)) {
            console.log (`${postId} found in cache, sending to router...`)
            callback(1, this.body[postId])
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
                callback({msg: "no post found, cannot create comment"});
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
            callback(this.body[request.postId])
            return
        })
    }

    createReply(request, callback = () => {}) {
        console.log("cache.createReply called")
        this.findOne(request.postId, (numberOfPosts) => {
            if (numberOfPosts === 0) {callback({msg: "no post found, cannot create reply."}); return}
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
            if (typeof targetComment === "undefined") {callback ({msg: "no comment found, cannot create reply."}); return}
            targetComment.replies.unshift(newReply)
            targetPost.lastUpdate = Math.max(newReply.lastUpdate, targetPost.lastUpdate)
            this.addToUpdateQueue(request.postId)
            callback(this.body[request.postId])
        })
    }

    updatePost(request, callback = () => {}) {
        this.findOne(request.postId, (numberOfPosts, targetPost)=> {
            console.log("cache.updatePost called")
            if (numberOfPosts === 0) {callback({msg: "no post found, cannot update post."}); return}
            if (this.isAuthorized(request.authorId, targetPost.authorId)) {
                targetPost.body = request.body
                targetPost.lastUpdate = Math.max(Date.now(), targetPost.lastUpdate)
                this.addToUpdateQueue(targetPost.id)
                callback(targetPost)
                return
            }
            callback({msg: "unauthorized to update post"})
        })
    }

    updateComment(request, callback = () => {}) {
        console.log("cache.updateComment called")
        this.findOne(request.postId, (numberOfPosts, targetPost)=> {
            if (numberOfPosts === 0) {
                callback({msg: "no post found, cannot update comment"})
                return
            }
            for (var i in targetPost.comments) {
                if (targetPost.comments[i].id === request.commentId) {
                    var targetComment = this.body[request.postId].comments[i]
                    break
                }
            }
            if (typeof targetComment === "undefined") {callback({ msg: "no comment found, cannot update"}); return}
            if (this.isAuthorized(targetComment.authorId, request.authorId)) {
                targetComment.body = request.body
                targetComment.lastUpdate = Math.max(Date.now(), targetComment.lastUpdate)
                targetPost.lastUpdate = Math.max(Date.now(), targetPost.lastUpdate)
                this.addToUpdateQueue(targetPost.id)
                callback(targetPost)
                return   
            }
            callback({ msg: "unauthorized to edit comment."})    
        })
    }

    updateReply(request, callback = () => {}) {
        console.log("cache.updateReply called")
        this.findOne(request.postId, (numberOfPosts) => {
            if (numberOfPosts === 0) {callback({msg: "no post found, cannot update reply"}); return}   
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
            if (typeof targetReply === "undefined") {callback ({msg: "no reply/comment found, cannot update reply"}); return}
            if (this.isAuthorized(targetReply.authorId, request.authorId)) {
                targetReply.body = request.body
                targetReply.lastUpdate = Math.max(Date.now(), targetReply.lastUpdate)
                targetComment.lastUpdate = Math.max(Date.now(), targetComment.lastUpdate)
                targetPost.lastUpdate = Math.max(Date.now(), targetPost.lastUpdate)
                this.addToUpdateQueue(targetPost.id)
                callback(targetPost)
                return
            }
            callback({msg: "unauthorized to edit reply."})
            return
        })
    }

    deletePost(request, callback = () => {}) {
        console.log("cache.deletePost called")
        this.findOne(request.postId, (numberOfPosts, targetPost) => {
            if (numberOfPosts === 0) {
                callback({msg: "no Post found, cannot delete post."});
                return
            }
            if (this.isAuthorized(request.userId, targetPost.authorId)) {
                delete this.body[request.postId]
                this.addToDeleteQueue(request.postId)
                callback({msg: request.postId + " deleted."})
                return
            }
            callback({msg: "unauthorized to delete post"})
            return
        })
    }

    deleteComment(request, callback = () => {}) {
        this.findOne(request.postId, (numberOfPosts, targetPost) => {
            if(numberOfPosts === 0) {callback({msg: "no post found, cannot delete comment"}); return}
            console.log("deleting comment")
            for (var i in this.body[request.postId].comments) {
                if (this.body[request.postId].comments[i].id === request.commentId) {
                    if (this.isAuthorized(request.userId, this.body[request.postId].comments[i].authorId)) {
                        this.body[request.postId].comments.splice(i, 1)
                        console.log(this.body[request.postId].comments.length)
                        this.addToUpdateQueue(request.postId)
                        callback(this.body[request.postId])
                        return
                    }
                    callback({msg: "unauthorized to delete comment."})
                    return
                }
            }
            callback({msg: "no comment found, cannot delete comment."})
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