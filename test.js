const queryPost = require("./dbServices/queryPost")
const connect = require("./dbServices/connect")
const Cache = require("./services/cache2.js")
const createReply = require("./dbServices/createReply")
const createPost = require("./dbServices/createPost")
const createComment = require("./dbServices/createComment")



connect(() => {
    createComment({
        postId: "60c35f0b3020b301c6e3d72a",
        body: "11th June create Comment with new Post using $Push",
        authorId: 1001
    }, (updatedPost) => {
        console.log(updatedPost)
    })
})
