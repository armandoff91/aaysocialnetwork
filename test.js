const queryPost = require("./dbServices/queryPost")
const connect = require("./dbServices/connect")
const Cache = require("./services/cache2.js")



connect(
    queryPost({filter : {_id: "60a3a62225f2e20367aa2350"}}, (numberOfPosts, posts) => {
        // console.log(result[0].id === "60a3a62225f2e20367aa2350") // true
        const cache = new Cache()
        cache.pushMany(posts)
        console.log("*******"+ cache.isInCache("60a3a62225f2e20367aa2350"))
        cache.findOne("60a3a62225f2e20367aa2350", (post) => {
            console.log(post.id)
        })
    })
)
