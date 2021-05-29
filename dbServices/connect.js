const mongoose = require("mongoose")
const dotenv = require('dotenv').config()


function connect(callback) {
    console.log("connecting to db")
    mongoose.connect(process.env.DB_POSTS, {useNewUrlParser: true, useUnifiedTopology: true})
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', callback)
}

module.exports = connect
