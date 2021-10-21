const queryUser = require("./queryUser")

function updateUser(userId, update, callback) {
    queryUser({filter: {_id: userId}}, (numberOfUsers, users) => {
        if(numberOfUsers === 1) {
            var userUpdate = users[0]
            for (entry in update) {
                const validEntries = ["password", "email", "firstName", "lastName"]
                if (validEntries.includes(entry)) {
                    userUpdate[entry] = update[entry]
                } else {
                    callback({msg: "Invalid entries."})
                    return
                }
            }
            userUpdate.save().then((updatedUser) => {
                callback(updatedUser)   
            }).catch((err) => {
                callback({msg: err})
            })
            
        } else {
            callback({msg: "Error: no user found"})
        }
    })
}

module.exports = updateUser