const createPost = require("./createPost")
// example: createPost({author_id: 0002, title: "test1 for createPost", body: "test1 for createPost"})

const queryPost = require("./queryPost")
// example:
// queryPost({author_id: 3}, (result) => {
//     console.log(result)
// })

const updatePost = require("./updatePost")

// updatePost({_id : "60a3a3b1951e1103235c7c40"}, {body: "updateOne test"})

createPost({author_id: 1002, title: "test221 for createPost", body: "test11 for createPost"}, (savedDoc) => console.log(savedDoc))