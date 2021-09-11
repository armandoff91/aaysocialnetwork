console.log("home.js loaded")

class Post extends React.Component{
    constructor(props) {
        super(props)
        this.commentToggle = this.commentToggle.bind(this)
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

    query(callback) {
        const XHR = new XMLHttpRequest()

        XHR.addEventListener('load', function(e) {
            
            callback(JSON.parse(XHR.response))
            
        });

        XHR.addEventListener('error', function(e) {
            alert( 'Oops! Something went wrong.' );
        } );

        XHR.open( 'GET', '/posts/?postId=' + "613a0d97bd4dbb032efd8100" );
        XHR.send(null);
    }

    loadToBlock() {
        this.query((post) => {
            this.setState({
                post: post
            })
        })
    }

    componentDidMount() {
        this.loadToBlock()
    }

    render() {
        return <div class="container">
            <div class="row">
                <div class="col-3 col-sm-1 h-100"><img src="images/gump.jpg" class="img-thumbnail"></img></div>
                <div class="col-11">
                    <p class="strong">{this.state.post.body}</p>
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
            <CommentSection isCommentToggled={this.state.isCommentToggled} commentList={this.state.post.comments}/>
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
            return this.commentList()
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
        return <div>
            {this.props.comment.body}
        </div>
    }
}

ReactDOM.render(<Post />, document.querySelector("#postBoard"))