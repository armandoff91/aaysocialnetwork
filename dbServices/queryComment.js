const mongoose = require("mongoose")
const connect = require("./connect")

const commentSchema = require("./schemas/commentSchema")

const Comment = mongoose.model("Comment", commentSchema)

// function queryComment (filter, (queryResult) => {
    
// })
connect( () => {
    Comment.find({_id: {$eq: "60b77590994cf6007560e3ce"}}, (document) => {
        console.log(document)
    }).catch((err) => {
        console.log(err)
    })
})
