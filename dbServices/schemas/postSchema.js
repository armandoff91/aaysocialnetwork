const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:  String, // String is shorthand for {type: String}
    author_id: Number,
    body:   String,
    comments: [{author_id: Number, body: String, date: Number}],
    date: { type: Number, default: Date.now() },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
});

module.exports = postSchema;
