const mongoose = require("mongoose")

const queryUser = require("../dbServices/queryUser")
const schemas = require("../dbServices/schemas/schemas")

const User = mongoose.model("User", schemas.userSchema)

class UserCache {
    constructor() {
        console.log("user cache constructed")
        this.body = {}
    }

    init(numberOfUsers = 100) {
        console.log("user Cache init")
        queryUser({filter: {}, projection: null,
        option: {
            limit: numberOfUsers, 
        }}, 
        (numberOfUsers, users) => {
            for (var i=0; i<users.length; i++) {
                this.body[users[i].id] = users[i]
            }
        })
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


    findOne(userId, callback) {
        console.log("findOne user called")
        if (this.isInCache(userId)) {
            console.log (`${userId} found in cache, sending to router...`)
            callback(1, this.body[userId])
        } else {
            console.log(`${userId} not in cache, retriving from db...`)
            queryUser({filter: {_id: userId}}, (numberOfUsers, users) => {
                this.pushMany(users)
                callback(numberOfUsers, this.body[userId])
            })
        }
    }

}

module.exports = UserCache