console.log("home.js loaded")

var pinnedPostList = [];
var postList = [];
var userList = {};
var currentPostListPosition = 0;

function sortPostListByDate() {
    postList.sort((a, b) => {
        if (a[1] > b[1]) {
            return -1
        }
        return 1
    })
}

const loadPost = (startingPosition, numberOfPosts) => {
    for (i = 0; i < numberOfPosts; i++) {
        const post = document.createElement("div")
        post.setAttribute("id", postList[startingPosition + i][0])
        document.querySelector("#postBoard").appendChild(post)
        ReactDOM.render(<Post postId={postList[startingPosition + i][0]} />, document.getElementById(postList[startingPosition + i][0]))
    }
    currentPostListPosition += numberOfPosts
}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    ReactDOM.render(<NewPostSection />, document.querySelector("#newPostSection"))

    if (postList.length === 0) {
        const XHR = new XMLHttpRequest()

        XHR.addEventListener('load', function(e) {
            postList = JSON.parse(XHR.response).postList
            sortPostListByDate()
            loadPost(0, 5)
        });

        XHR.addEventListener('error', function(e) {
            alert( 'unable to get post list' );
        } );

        XHR.open( 'GET', '/posts/postList');
        XHR.send(null);
    }
});


window.addEventListener("scroll", (event) => {
    
    if ((window.scrollY + window.innerHeight) >= (document.documentElement.scrollHeight * 0.99)) {
        if (currentPostListPosition < postList.length) {
            loadPost(currentPostListPosition, 5)    
        }
    }
})