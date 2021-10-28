const express = require("express");
const router = express.Router()

router.use("/", (req, res, next) => {

    res.status(403).json({msg: "403 Forbidden"})
})

module.exports = router