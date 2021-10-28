const express = require("express");
const router = express.Router()

router.use("/", (req, res, next) => {

    if (req.query.hasOwnProperty("postId")) {
        if (req.query.postId.length === 24) {
            next()
            return
        }
    }

    if (Object.keys(req.query).length === 0) {next(); return}
    res.status(403).json({msg: "forbidden"})
})

module.exports = router