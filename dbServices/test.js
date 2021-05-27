const createPost = require("./createPost")
// example: createPost({author_id: 0002, title: "test1 for createPost", body: "test1 for createPost"})

const queryPost = require("./queryPost")
// example:
// queryPost({author_id: 3}, (result) => {
//     console.log(result)
// })

const updatePost = require("./updatePost")



// queryPost({filter: {_id:"60af64bfd80b770059a53610"}}, (result) => {
//     console.log(result)
// })

const comment = {author_id: 1002, body: "comment 1"}

const update = {
    $push: {comments: comment},
}
//$push: { friends: friend }


updatePost({_id:"60af64bfd80b770059a53610"}, update, (updatedPost) => {
    console.log(updatedPost)
})

// queryPost({filter: {_id: "60af64bfd80b770059a53610"}}, (result) => {
//     console.log(result)
// })