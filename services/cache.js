const createPost = require("../dbServices/createPost")
const queryPost = require("../dbServices/queryPost")
const updatePost = require("../dbServices/updatePost")


class Cache {
    constructor() {
        this.body = []
    }
    init(numberOfposts = 1000) {
        queryPost({filter: {date: {$gt: Date.now() - 86400000 * 30}}, projection: null,
        option: {
            limit: numberOfposts, 
            sort: {date: -1}
        }}, 
        (posts) => {
            console.log(posts.length)
        })
    }
    flush() {
        this.body = []
    }
    halfFlush() {
        for (var i=0; i <= 0.5 * this.body.length; i++) {
            this.body.pop()
        }
    }
    show() {
        console.log(this.body)
    }
    size() {
        return this.body.length
    }
    newPost(post, callback = () => {}) {
        // title, author_id, body
        createPost({title: post.title, author_id: post.author_id, body: post.body}, (savedDoc) => {
            // unshift post to cache
            this.body.unshift(savedDoc)
            // 
            callback(savedDoc)
        })
    }

    newComment(postId, comment, callback = () => {}) {
        const update = {
            $push : {comments: {
                author_id : comment.author_id,
                body: comment.body,
            }}
        }
        updatePost({_id: postId}, update, (updatedPost) => {
            console.log(updatedPost.comments)
            callback(updatedPost)
        })
    }
    query(conditions, callback = () => {}) {

    }
}

cache = new Cache()
cache.newComment('60af64bfd80b770059a53610', {
    author_id: 1003,
    body: "comment 2"
})