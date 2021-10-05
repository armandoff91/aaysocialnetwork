const express = require("express");
const router = express.Router()
const UserCache = require("../services/userCache")

var userCache = new UserCache()

userCache.init()

router
    .route("/")
    .get((req, res) => {
        console.log(req.query)
        userCache.findOne(req.query.userId, (numberOfUsers, user) => {
            if (numberOfUsers === 1) {
                const result = {
                    _id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                }
                res.json(result)
                return
            } 
            res.json({msg: "no user found"})
        })
})

module.exports = router