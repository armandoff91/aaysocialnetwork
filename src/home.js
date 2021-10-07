console.log("home.js loaded")

var pinnedPostList = [];
var postList = [];
var userList = {};
var currentPostListPosition = 0;

class UserName extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username : null
        }
        this.getUserName = this.getUserName.bind(this)
        this.mountUsername = this.mountUsername.bind(this)
    }

    getUserName(callback) {
        const XHR = new XMLHttpRequest()

        XHR.addEventListener('load', function(e) {
            callback(JSON.parse(XHR.response))
        });

        XHR.open('GET', '/user?userId=' + this.props.userId);
        XHR.send(null);
    }

    mountUsername() {
        if (userList[this.props.userId] !== undefined) {
            this.setState({
                username: userList[this.props.userId]
            })
        } else {
            this.getUserName((response) => {
                userList[this.props.userId] = (response.firstName + " " + response.lastName) != "undefined undefined" ? 
                    response.firstName + " " + response.lastName : this.props.userId  
                this.setState({
                    username: userList[this.props.userId]
                })
            })
        }
    }
    
    componentDidUpdate(prevProps) {
        if ((this.props.userId !== prevProps.userId) && (this.props.userId !== null)) {
            this.mountUsername()
        }
    }

    componentDidMount() {
        if (this.props.userId !== null) {
            this.mountUsername()
        }
    }

    render() {
        return <p className="strong">{this.state.username}</p>
    }
}


class Dropdown extends React.Component {
    constructor(props) {
        super(props)
        this.handleUpdateRequest = this.handleUpdateRequest.bind(this)
        this.handleDeleteRequest = this.handleDeleteRequest.bind(this)
    }

    postRequest(url, data, callback) {
        const XHR = new XMLHttpRequest()
        var formData = new FormData()

        for (key in data) {
            formData.append(key, data[key])
        }

        XHR.addEventListener('load', function(e) {
            callback(JSON.parse(XHR.response))
        });

        XHR.addEventListener('error', function(e) {
            alert( 'Oops! Something went wrong.' );
        } );

        XHR.open('POST', '/posts/' + url);
        XHR.send(formData);
    }

    handleUpdateRequest() {

    }

    handleDeleteRequest() {

    }

    render() {
        return <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                
            </a>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><a className="dropdown-item" href="#">Edit</a></li>
                <li><a className="dropdown-item" href="#">Delete</a></li>
            </ul>
        </div>
    }
}

class NewPostSection extends React.Component{
    constructor(props) {
        super(props)
        this.submitNewPost = this.submitNewPost.bind(this)
    }

    submitNewPost(event) {
        event.preventDefault()
        const XHR = new XMLHttpRequest()
        var formData = new FormData()

        formData.append("title", event.target.querySelector("#newPostTitle").value)
        formData.append("body", event.target.querySelector("#newPostBody").value)

        XHR.addEventListener('load', function(e) {
            const post = document.createElement("div")
            post.setAttribute("id", JSON.parse(XHR.response)._id)
            document.querySelector("#pinnedPostBoard").appendChild(post)
            ReactDOM.render(<Post postId={JSON.parse(XHR.response)._id} />, document.getElementById("" + JSON.parse(XHR.response)._id))
        });

        XHR.addEventListener('error', function(e) {
            alert( 'Oops! Something went wrong.' );
        } );

        XHR.open('POST', '/posts/newPost');
        XHR.send(formData);
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col">
                    <h6>New Post</h6>
                    <form className="form-inline" onSubmit={this.submitNewPost}>
                        <div className="form-group">
                            <input className="form-control" placeholder="Title" id="newPostTitle"></input>
                            <input className="form-control" placeholder="What's on your mind?" id="newPostBody"></input>
                        </div>
                        <button type="submit" className="btn">submit</button>
                    </form>
                </div>
            </div>
        </div>
    }
}

class Post extends React.Component{
    constructor(props) {
        super(props)
        this.commentToggle = this.commentToggle.bind(this)
        this.displayTime = this.displayTime.bind(this)
        for (key in this.handleFormSubmit) {
            this.handleFormSubmit[key] = this.handleFormSubmit[key].bind(this)
        }
        this.state = {
            isPostReceived: false,
            isCommentToggled: false,
            post: {
                "date": null,
                "hidden":null,
                "lastUpdate":null,
                "__v": null,
                "_id":null,
                "authorId":null,
                "title": null,
                "body":null,
                "comments":["blank"]
            }
        }
    }

    commentToggle() {
        this.setState({
            isCommentToggled: this.state.isCommentToggled === false? true : false
        })
    }

    getRequest(callback) {
        const XHR = new XMLHttpRequest()

        XHR.addEventListener('load', function(e) {
            callback(JSON.parse(XHR.response))
        });

        XHR.addEventListener('error', function(e) {
            alert( 'Oops! Something went wrong.' );
        } );

        XHR.open('GET', '/posts/?postId=' + this.props.postId );
        XHR.send(null); 
    }

    postRequest(url, data, callback) {
        const XHR = new XMLHttpRequest()
        var formData = new FormData()

        for (key in data) {
            formData.append(key, data[key])
        }

        XHR.addEventListener('load', function(e) {
            callback(JSON.parse(XHR.response))
        });

        XHR.addEventListener('error', function(e) {
            alert( 'Oops! Something went wrong.' );
        } );

        XHR.open('POST', '/posts/' + url);
        XHR.send(formData);
    } 

    loadToBlock() {
        this.getRequest((post) => {
            this.setState({
                isPostReceived: true,
                post: post,
            })
        })
    }

    displayTime(n) {
        return moment(n).format("DD MMM YYYY hh:mm a")
    }

    componentDidMount() {
        this.loadToBlock()
    }

    handleFormSubmit = {
        newComment: function (event) {
            event.preventDefault()
            this.postRequest("newComment", {
                postId: this.props.postId,
                body: event.target.querySelector("input").value
            }, (post) => {
                this.setState({
                    post: post
                })
            })
        },

        newReply: function (event)  {
            event.preventDefault()
            console.log("submit reply pressed")
            this.postRequest("newReply", {
                postId: this.props.postId,
                commentId: event.target.getAttribute("commentid"),
                body: event.target.querySelector("input").value
            }, (post) => {
                this.setState({
                    post: post
                })
            })
        }, 
    }

    render() {
        return <div className="container my-5">
            <div className="row">
                <div className="col-3 col-sm-1 h-100"><img src="images/portrait_2.png" className="img-thumbnail"></img></div>
                <div className="col-11">
                    <UserName userId={this.state.post.authorId} />
                    <p className="small">{this.displayTime(this.state.post.date)}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-11">
                    <p className="strong">{this.state.post.title}</p>
                    <p>{this.state.post.body}</p>
                </div>
                <div className="col-1">
                    <Dropdown />
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col">
                    <button type="button" className="btn">likes</button>
                    <button type="button" className="btn" onClick={this.commentToggle}>Comment</button>
                    <a>{this.state.post.comments.length}</a>
                </div>
            </div>
            <CommentSection handleFormSubmit={this.handleFormSubmit} isCommentToggled={this.state.isCommentToggled} commentList={this.state.post.comments}/>
        </div>
    }
}

class CommentSection extends React.Component {
    constructor(props) {
        super(props)
        this.commentList = this.commentList.bind(this)
    }

    commentList() {
        return this.props.commentList.map((comment) => <Comment key={comment._id} comment={comment} handleFormSubmit={this.props.handleFormSubmit}/>)
    }

    render() {
        if (this.props.isCommentToggled) {
            return <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <form className="form-inline" onSubmit={this.props.handleFormSubmit.newComment}>
                                <div className="form-group">
                                    <input className="form-control" placeholder="Your Comment here..."></input>
                                </div>
                                <button type="submit" className="btn">submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                {this.commentList()}
            </div>
        }
        return <div>
            blank
        </div>
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isReplyToggled: false,
        }
        this.replyToggle = this.replyToggle.bind(this)
    }


    replyToggle() {
        this.setState({
            isReplyToggled: this.state.isReplyToggled === false? true : false 
        })
    }

    render() {
        return <div className="container" commentid={this.props.comment._id}>
            <div className="row">
                <div className="col-11">
                    <UserName userId={this.props.comment.authorId}/>
                    <p className="small">{this.props.comment.body}</p>
                    <button type="button" className="btn">like</button>
                    <button type="button" className="btn" onClick={this.replyToggle}>reply</button>
                </div>
                <div className="col-1">
                    <Dropdown />
                </div>
            </div>
            <ReplySection commentid={this.props.comment._id} isReplyToggled={this.state.isReplyToggled} replyList={this.props.comment.replies} handleFormSubmit={this.props.handleFormSubmit}/>
        </div>
    }
}

class ReplySection extends React.Component {
    constructor(props) {
        super(props)
        this.replyList = this.replyList.bind(this)
    }

    replyList() {
        return this.props.replyList.map((reply) => <Reply key={reply._id} reply={reply} commentid={this.props.commentid} replyid={reply._id}/>)
    }

    render() {
        if (this.props.isReplyToggled) {
            return <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <form className="form-inline" onSubmit={this.props.handleFormSubmit.newReply} commentid={this.props.commentid}>
                                <div className="form-group">
                                    <input className="form-control" placeholder="Your Reply here..."></input>
                                </div>
                                <button type="submit" className="btn">submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                {this.replyList()}
            </div>
        }
        return <div>
            reply section collapsed
        </div>
    }
}

class Reply extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="row" commentid={this.props.commentid} replyid={this.props.reply._id}>
            <div className="col-11">
                <UserName userId={this.props.reply.authorId}/>
                <p>{this.props.reply.body}</p>
            </div>
            <div className="col-1">
                <Dropdown />
            </div>
        </div>
    }
}

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