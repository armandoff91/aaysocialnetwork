const mongoose = require("mongoose")

const replySchema = new mongoose.Schema({
  authorId: Number,
  body: String,
  date: {type: Number, default: Date.now()},
  hidden: {type: Boolean, default: false},
  meta: {upvotes: {type: Number, default: 0}, downvotes: {type: Number, default:0}},
  lastUpdate: {type: Number, default: Date.now()}
})

const commentSchema = new mongoose.Schema({
  authorId: Number,
  body: String,
  date: {type: Number, default: Date.now()},
  hidden: {type: Boolean, default: false},
  meta: {upvotes: {type: Number, default: 0}, downvotes: {type: Number, default:0}},
  replies: [replySchema],
  lastUpdate: {type: Number, default: Date.now()}
})


const postSchema = new mongoose.Schema({
    title:  String,
    authorId: Number,
    body:   String,
    comments: [commentSchema],
    date: { type: Number, default: Date.now() },
    hidden: {type: Boolean, default: false},
    meta: {upvotes: Number, downvotes: Number},
    lastUpdate: {type: Number, default: Date.now()},
    __v: {type: Number, default: 1.01}
});

const schemas = {
  postSchema: postSchema,
  commentSchema: commentSchema,
  replySchema: replySchema
}

module.exports = schemas;
