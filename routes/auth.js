const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const schemas = require("../dbServices/schemas/schemas")
const userSchema = schemas.userSchema
const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const User = mongoose.model("User", userSchema)

passport.use(new LocalStrategy(
    function (username, password, done) {
        // done() is a callback
        User.findOne({username : username}, (error, user) => {
            if (error) {return done(error)}
            if (!user) {
                console.log("invalid user");
                return done(null, false, {message: "invalid user."})
            }
            user.validPassword(password, (valid) => {
                if (!valid) {
                    return done(null, false, {message: "invalid password."})
                }
                return done(null, user)
            })
        })
    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

router
    .route("/register") // auth/register
    .get((req, res) => {
        res.render("register")
    })
    .post((req, res) => {
        console.log("auth/register reached")
        if (req.body.password != req.body.confirmPassword) {
            res.json({msg: "password confirmation does not match"})
            return
        }
        const entry = {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateOfSignup: Date.now()
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {console.log(err); return}
            entry.password = hash
            const newUser = new User ({...entry})
            User.countDocuments({username: entry.username}, (err, count) => {
                if (count === 0) {
                    newUser.save().then((newUser) => {
                        res.json({msg: "new user saved"})
                    }).catch((err) => {
                        console.log("user save failed, user info invalid")
                        res.json({msg: "User information incomplete/invalid"})
                    })
                    return
                }
                res.send({msg: `${entry.username} already exists.`})
            })
        })
})

router
    .route("/login")
    .get((req, res) => {
        res.render("login")
    })
    .post(passport.authenticate(
        'local',
        {
            session: true,
            failureFlash: 'Invalid username or password.'
        }

    ), (req, res) => {
        console.log(`${req.user.username} just logged in.`)
        res.json({msg: "login success"})
})


module.exports = router