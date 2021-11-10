const mongoose = require("mongoose")
require('dotenv').config()



function connect(callback = {}) {
    console.log("connecting to db")
    mongoose.connect(process.env.DB_POSTS, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        callback()
        console.log("db connected")
    }, (err) => {
        console.log(err)
    })
}

module.exports = connect

