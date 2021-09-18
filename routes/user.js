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
                res.json(user)
                return
            } 
            res.json({msg: "no user found"})
        })
})
