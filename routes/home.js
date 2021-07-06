const express = require("express");
const router = express.Router()
const expressHandlebars = require("express-handlebars")
const queryPost = require("../dbServices/queryPost")

router
    .route("/")

    // get 10 posts from cache
    .get((req, res, params) => {
        console.log("get /home reached.")
        res.render("home")
})

// when receive get request, check cache length
// if cache length = 0, grab post from db

module.exports = router