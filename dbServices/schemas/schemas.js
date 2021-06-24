const mongoose = require("mongoose")

const replySchema = new mongoose.Schema({
  authorId: Number,
  body: String,
  date: {type: Number, default: 0},
  hidden: {type: Boolean, default: false},
  meta: {upvotes: {type: Number, default: 0}, downvotes: {type: Number, default:0}},
  lastUpdate: {type: Number, default: 0}
})

const commentSchema = new mongoose.Schema({
  authorId: Number,
  body: String,
  date: {type: Number, default: 0},
  hidden: {type: Boolean, default: false},
  meta: {upvotes: {type: Number, default: 0}, downvotes: {type: Number, default:0}},
  replies: [replySchema],
  lastUpdate: {type: Number, default: 0}
})


const postSchema = new mongoose.Schema({
    title:  String,
    authorId: Number,
    body:   String,
    comments: [commentSchema],
    date: { type: Number, default: 0 },
    hidden: {type: Boolean, default: false},
    meta: {upvotes: Number, downvotes: Number},
    lastUpdate: {type: Number, default: 0},
    __v: {type: Number, default: 1.01}
});

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  dateOfSignup: {type: Number, required: true}
})

userSchema.methods.validPassword = function(attempt) {
  return attempt === this.password
}

const schemas = {
  postSchema: postSchema,
  commentSchema: commentSchema,
  replySchema: replySchema,
  userSchema: userSchema
}

module.exports = schemas;
