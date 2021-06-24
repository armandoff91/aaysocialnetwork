const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const schemas = require("../dbServices/schemas/schemas")
const userSchema = schemas.userSchema
const bcrypt = require("bcrypt")

const User = mongoose.model("User", userSchema)

var user = new User ({
    username: "Albert",
    password: "password",
    email: "abc@gmail.com",
    dateOfSignup: Date.now()
})

router
    .route("/")
    .get((req, res) => {
        console.log("route reached.")
        res.send("this is /auth")
})

router
    .route("/register") // auth/register
    .post((req, res) => {
        console.log("auth/register reached")
        if (req.body.password != req.body.confirmPassword) {
            res.json({msg: "password confirmation does not match"})
            return
        }
        const entry = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            dateOfSignup: Date.now()
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {console.log(err); return}
            entry.password = hash
            const newUser = new User ({...entry})
            newUser.save().then((newUser) => {
                res.json({msg: "new user saved"})
            }).catch((err) => {
                console.log("user save failed, user info invalid")
                res.json({msg: "User information incomplete/invalid"})
            })
        })
})

module.exports = router

// bcrypt.hash("password", 10, function(err, hash) {
//     if (err) {throw err}
//     bcrypt.compare("password", hash, (err, result) => {
//         console.log(`correct: ${result}`)
//     })
//     bcrypt.compare("wrong", hash, (err, result) => {
//         console.log(`wrong: ${result}`)
//     })
// });