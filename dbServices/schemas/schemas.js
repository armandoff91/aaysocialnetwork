const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const replySchema = new mongoose.Schema({
  authorId: {required: true, type: String},
  body: String,
  date: {type: Number, default: 0},
  hidden: {type: Boolean, default: false},
  meta: {upvotes: {type: Number, default: 0}, downvotes: {type: Number, default:0}},
  lastUpdate: {type: Number, default: 0}
})

const commentSchema = new mongoose.Schema({
  authorId: {required: true, type: String},
  body: String,
  date: {type: Number, default: 0},
  hidden: {type: Boolean, default: false},
  meta: {upvotes: {type: Number, default: 0}, downvotes: {type: Number, default:0}},
  replies: [replySchema],
  lastUpdate: {type: Number, default: 0}
})


const postSchema = new mongoose.Schema({
    title:  {type: String, default: null},
    authorId: {required: true, type: String},
    body:   {required: true, type: String},
    comments: [commentSchema],
    date: { type: Number, default: 0 },
    hidden: {type: Boolean, default: false},
    meta: {upvotes: Number, downvotes: Number},
    lastUpdate: {type: Number, default: 0},
    __v: {type: Number, default: 1.01}
});

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  dateOfSignup: {type: Number, required: true}
})

userSchema.methods.validPassword = function (attempt, callback) {
  bcrypt.compare(attempt, this.password, (err, result) => {
    if (err) {throw err}
    callback (result)
  })
}

const schemas = {
  postSchema: postSchema,
  commentSchema: commentSchema,
  replySchema: replySchema,
  userSchema: userSchema
}

module.exports = schemas;
