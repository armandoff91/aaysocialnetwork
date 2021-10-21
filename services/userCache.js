const mongoose = require("mongoose")

const queryUser = require("../dbServices/queryUser")
var updateUser = require("../dbServices/updateUser")
const schemas = require("../dbServices/schemas/schemas")
const User = mongoose.model("User", schemas.userSchema)

const bcrypt = require("bcrypt")

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

    refresh(userId) {
        setTimeout(() => {
            queryUser({filter: {_id: userId}}, (numberOfUsers, users) => {
                for (var i=0; i<users.length; i++) {
                    this.body[users[i].id] = users[i]
                }
            })
        }, 5000)
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

    update(userId, update, callback) {
        queryUser({filter: {_id: userId}}, (numberOfUsers, userOriginal) => {
            if (numberOfUsers === 1) {
                bcrypt.compare(update.pwConfirmation, userOriginal[0].password, function(err, result) {
                    if (err) {console.log(err);callback({msg: "Password confirmation error"})}
                    if (result === true) {
                        delete update.pwConfirmation
                        updateUser(userId, update, (dbRes) => {
                            callback(dbRes)
                        })
                    } else if (result === false) {
                        callback({msg: "Invalid Password."})    
                    }
                });
                this.refresh(userId)
            } else {
                callback({msg: "No User Found."})
            }
        })
    
    }

}

module.exports = UserCache