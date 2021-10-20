const express = require("express");
const router = express.Router()
const expressHandlebars = require("express-handlebars")
const queryPost = require("../dbServices/queryPost")

router
    .route("/")
    .get((req, res, params) => {
        console.log("get /home reached.")
        res.render("home")
})

module.exports = router