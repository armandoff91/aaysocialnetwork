console.log("home.js loaded")

class Post extends React.Component{
    constructor(props) {
        super(props)
        this.commentToggle = this.commentToggle.bind(this)
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
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
                "comments":[]
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
                post: post
            })
        })
    }

    componentDidMount() {
        this.loadToBlock()
    }

    handleCommentSubmit(event) {
        event.preventDefault()
        console.log("submit comment pressed")
        this.postRequest("newComment", {
            postId: this.props.postId,
            body: event.target.querySelector("input").value
        }, (post) => {
            this.setState({
                post: post
            })
        })
    }

    handleReplySubmit(event) {
        event.preventDefault()
        this.postRequest("newReply", {
            postId: this.props.postId,
            commentId: event.target.getAttribute("commentId"),
            body: event.target.querySelector("input").value
        })
    }

    render() {
        return <div class="container">
            <div class="row">
                <div class="col-3 col-sm-1 h-100"><img src="images/gump.jpg" class="img-thumbnail"></img></div>
                <div class="col-11">
                    <p class="strong">{this.state.post.authorId}</p>
                    <p class="small">{this.state.post.date}</p>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p class="strong">{this.state.post.title}</p>
                    <p>{this.state.post.body}</p>
                </div>
            </div>
            <div class="row justify-content-between">
                <div class="col">
                    <button type="button" class="btn">likes</button>
                    <button type="button" class="btn" onClick={this.commentToggle}>Comment</button>
                    <a>{this.state.post.comments.length}</a>
                </div>
            </div>
            <CommentSection handleCommentSubmit={this.handleCommentSubmit} isCommentToggled={this.state.isCommentToggled} commentList={this.state.post.comments}/>
        </div>
    }
}

class CommentSection extends React.Component {
    constructor(props) {
        super(props)
        this.commentList = this.commentList.bind(this)
    }

    commentList() {
        return this.props.commentList.map((comment) => <Comment key={comment._id} comment={comment}/>)
    }

    render() {
        if (this.props.isCommentToggled) {
            return <div>
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <form class="form-inline" onSubmit={this.props.handleCommentSubmit}>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Your Comment here..."></input>
                                </div>
                                <button type="submit" class="btn">submit</button>
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
            comment : this.props.comment
        }
    }

    render() {
        return <div class="container" commentid={this.props.comment._id}>
            <div class="row">
                <div class="col">
                    <h6>{this.props.comment.authorId}</h6>
                    <p class="small">{this.props.comment.body}</p>
                    <button type="button" class="btn">like</button>
                    <button type="button" class="btn">reply</button>
                </div>
            </div>
        </div>
    }
}

var postList = [];


window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    if (postList.length === 0) {
        const XHR = new XMLHttpRequest()

        XHR.addEventListener('load', function(e) {
            postList = JSON.parse(XHR.response).postList
            for (i=0; i<5; i++) {
                const post = document.createElement("div")
                post.setAttribute("id", postList[i])
                document.querySelector("#postBoard").appendChild(post)
                ReactDOM.render(<Post postId={postList[i]} />, document.getElementById(postList[i]))
            }
        });

        XHR.addEventListener('error', function(e) {
            alert( 'unable to get post list' );
        } );

        XHR.open( 'GET', '/posts/postList');
        XHR.send(null);
    }
});

// ReactDOM.render(<Post postId="613a0d97bd4dbb032efd8100" />, document.querySelector("#postBoard"))