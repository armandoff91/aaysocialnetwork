class Post extends React.Component{
    constructor(props) {
        super(props)
        this.commentToggle = this.commentToggle.bind(this)
        this.editToggle = this.editToggle.bind(this)
        this.displayTime = this.displayTime.bind(this)
        for (key in this.handleFormSubmit) {
            this.handleFormSubmit[key] = this.handleFormSubmit[key].bind(this)
        }
        this.state = {
            isPostReceived: false,
            isCommentToggled: false,
            isEditToggled: false,
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

    editToggle(event) {
        event.preventDefault()
        this.setState({
            isEditToggled: this.state.isEditToggled === false? true : false
        })
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

        edit: function (event) {
            event.preventDefault()
            this.postRequest("edit" + event.target.getAttribute("context"), {
                postId: event.target.getAttribute("postid"),
                commentId: event.target.getAttribute("commentid"),
                replyId: event.target.getAttribute("replyid"),
                body: event.target.querySelector("input").value
            }, (post) => {
                this.setState({
                    post: post,
                    isEditToggled: false
                })
            })
        },

        delete: function (event) {
            event.preventDefault()
            if(confirm("Are you sure you want to delete the content?")) {
                this.postRequest("delete" + event.target.getAttribute("context"), {
                    postId: event.target.getAttribute("postid"),
                    commentId: event.target.getAttribute("commentid"),
                    replyId: event.target.getAttribute("replyid"),
                }, (response) => {
                    if (response.hasOwnProperty("msg")) {
                        alert(response.msg)
                        if (response.msg === "Post deleted.") {
                            location.reload();
                            return false;
                        }
                    } else {
                        this.setState({
                            post: response
                        })
                    }
                })
            } else {
                alert("delete request cancelled.")
            }
        }
    }

    render() {
        return <div className="container my-3 rounded bg-white p-2">
            <div className="row">
                <div className="col-3 col-sm-1 h-100"><img src="images/portrait_2.png" className="img-thumbnail"></img></div>
                <div className="col-9 col-sm-11">
                    <UserName userId={this.state.post.authorId} />
                    <div><p className="small">{this.displayTime(this.state.post.date)}</p></div>
                </div>
            </div>
            <div className="row">
                <div className="col-10 col-sm-11">
                    <p className="strong">{this.state.post.title}</p>
                    <ContentBody context="post" postId={this.state.post._id} body={this.state.post.body} isEditToggled={this.state.isEditToggled} editToggle={this.editToggle} handleEditSubmit={this.handleFormSubmit.edit}/>
                </div>
                <div className="col-2 col-sm-1">
                    <Dropdown context="post" postId={this.state.post._id} editToggle={this.editToggle} handleDeleteSubmit={this.handleFormSubmit.delete}/>
                </div>
            </div>
            <hr className="my-0"></hr>
            <div className="row">
                <div className="col mt-2">
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.commentToggle}>Comment <span className="badge badge-light">{this.state.post.comments.length}</span></button>
                </div>
            </div>
            <CommentSection handleFormSubmit={this.handleFormSubmit} isCommentToggled={this.state.isCommentToggled} commentList={this.state.post.comments} postId={this.state.post._id}/>
        </div>
    }
}