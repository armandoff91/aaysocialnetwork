const express = require("express");
const router = express.Router()

router
    .route("/")
    .get((req, res) => {
        res.send("hello profile")
})

router
    .route("/editName")
    .post((req, res) => {
        const update = {
            firstName: req.firstName,
            lastName: req.lastName
        }
        res.send(req.user)
})

router
    .route("/editPassword")
    .post((req, res) => {
        res.send("edit pw")
})

router
    .route("/editEmail")
    .post((req, res) => {
        res.send("edit pw")
})

module.exports = router