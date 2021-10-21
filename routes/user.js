const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router()
const UserCache = require("../services/userCache")

var userCache = new UserCache()


userCache.init()

router
    .route("/")
    .get((req, res) => {
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

router
    .route("/profile")
    .get((req, res) => {
        res.send("hello profile")
})

router
    .route("/profile/editName")
    .post((req, res) => {
        const update = {
            pwConfirmation: req.body.pwConfirmation,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
        userCache.update(req.user, update, (user) => {
            const response = {
                "_id": user._id,
                "username": user.username,
                "email": user.email,
                "dateOfSignup": user.dateOfSignup,
                "firstName": user.firstName,
                "lastName": user.lastName,
                msg: user.msg
            }
            res.json(response)
        })
})

router
    .route("/profile/editPassword")
    .post((req, res) => {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            const update = {
                pwConfirmation: req.body.pwConfirmation,
                password: hash,
            }
            userCache.update(req.user, update, (user) => {
                const response = {
                    "_id": user._id,
                    "username": user.username,
                    "email": user.email,
                    "dateOfSignup": user.dateOfSignup,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    msg: user.msg
                }
                res.json(response)
            })
        });
})

router
    .route("/profile/editEmail")
    .post((req, res) => {
        const update = {
            pwConfirmation: req.body.pwConfirmation,
            email: req.body.email,
        }
        userCache.update(req.user, update, (user) => {
            const response = {
                "_id": user._id,
                "username": user.username,
                "email": user.email,
                "dateOfSignup": user.dateOfSignup,
                "firstName": user.firstName,
                "lastName": user.lastName,
                msg: user.msg
            }
            res.json(response)
        })
})

module.exports = router