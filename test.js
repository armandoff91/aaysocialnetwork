const queryPost = require("./dbServices/queryPost")
const connect = require("./dbServices/connect")
const Cache = require("./services/cache2.js")
const createReply = require("./dbServices/createReply")



connect(() => {
    createReply({
        authorId: 1001,
        postId: "60c0b71237bbd8009b088cfc",
        commentId: "60c0b94353256000b19e1b22",
        body: "9th june createReply"
    }, (updatedPost) => {
        console.log(updatedPost)
    })
})
