const express = require("express");
const router = express.Router()
const expressHandlebars = require("express-handlebars")
const queryPost = require("../dbServices/queryPost")
const Cache = require("../services/cache")

var cache = new Cache()
cache.init()

router
    .route("/")
    .get((req, res) => {
        console.log("get /post reached.")
        console.log(req.query)
        console.log(req.params)
        console.log(req.body)
        res.send(`send JSON　with 10 posts`)
})

router
    .route("/")
    .post((req, res) => {
        console.log("/posts post req received")
        //req.params
        //req.query
        console.log(req.body)
        res.send("post req received")
        // console.log(req.query)
        // console.log(req.params)
})

router
    .route("/newPost")
    .post((req, res) => {
        console.log("new post request received")
        console.log(req.body)
        const newPost =  {
            authorId: req.body.userId,
            title: req.body.title,
            body: req.body.body
        }
        cache.newPost(newPost,(savedPost) => {
            console.log("post saved")
            res.send(savedPost + "")
        })
})



// when receive get request, check cache length
// if cache length = 0, grab post from db

module.exports = router