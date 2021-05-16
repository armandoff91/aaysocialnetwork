const express = require("express");
const router = express.Router()

router
    .route("/")
    .get((req, res) => {
        console.log("route reached.")
        res.send("this is /auth")
})

router
    .route("/register")
    .get((req, res) => {
        res.send("/auth/register")
})

module.exports = router