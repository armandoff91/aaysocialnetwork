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
        if (this.isInCache(userId)) {
            callback(1, this.body[userId])
        } else {
            queryUser({filter: {_id: userId}}, (numberOfUsers, users) => {
                this.pushMany(users)
                callback(numberOfUsers, this.body[userId])
            })
        }
    }

}

module.exports = UserCache