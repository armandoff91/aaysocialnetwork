const mongoose = require("mongoose")
const dotenv = require('dotenv').config()



function connect(callback) {
    console.log("connecting to db")
    mongoose.connect(process.env.DB_POSTS, {useNewUrlParser: true, useUnifiedTopology: true})
    const db = mongoose.connection;
    db.catch((err) => {
        console.log(err)
    })
    db.then(() => {
        callback()
    })
}

module.exports = connect

