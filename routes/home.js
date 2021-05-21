const express = require("express");
const router = express.Router()
const expressHandlebars = require("express-handlebars")
const queryPost = require("../dbServices/queryPost")

const cache = [];

router
    .route("/")
    .get((req, res) => {
        console.log("route reached.")
        queryPost({date: {$gt: 1621337000000}}, (result) => {
            for (i in result) {
                cache.push(result[i])
            }
            console.log(cache)
            res.render("home", {cachePost: cache})
        })
})

// when receive get request, check cache length
// if cache length = 0, grab post from db

module.exports = router