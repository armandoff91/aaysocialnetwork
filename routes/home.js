const express = require("express");
const router = express.Router()
const expressHandlebars = require("express-handlebars")
const queryPost = require("../dbServices/queryPost")

router
    .route("/")
    .get((req, res) => {
        console.log("route reached.")
})

// when receive get request, check cache length
// if cache length = 0, grab post from db

module.exports = router