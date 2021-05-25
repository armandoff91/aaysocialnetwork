const createPost = require("../dbServices/createPost")


class Cache {
    constructor() {
        this.body = []
    }
    init() {
        
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
    newPost(post, callback) {
        // title, author_id, body
        createPost({title: post.title, author_id: post.author_id, body: post.body}, (savedDoc) => {
            // unshift post to cache
            this.body.unshift(savedDoc)
            // 
            callback(savedDoc)
        })
    }
    query(conditions) {

    }
}

var cache = new Cache();
