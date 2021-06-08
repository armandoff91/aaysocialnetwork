const mongoose = require("mongoose")

const queryPost = require("../dbServices/queryPost")
const schemas = require("../dbServices/schemas/schemas")

const Post = mongoose.model("Post", schemas.postSchema)

class Cache {
    constructor() {
        console.log("cache constructed")
        this.body = {}
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
}

module.exports = Cache