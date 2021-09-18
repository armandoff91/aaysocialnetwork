var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log("home.js loaded");

var NewPostSection = function (_React$Component) {
    _inherits(NewPostSection, _React$Component);

    function NewPostSection(props) {
        _classCallCheck(this, NewPostSection);

        var _this = _possibleConstructorReturn(this, (NewPostSection.__proto__ || Object.getPrototypeOf(NewPostSection)).call(this, props));

        _this.submitNewPost = _this.submitNewPost.bind(_this);
        return _this;
    }

    _createClass(NewPostSection, [{
        key: "submitNewPost",
        value: function submitNewPost(event) {
            event.preventDefault();
            var XHR = new XMLHttpRequest();
            var formData = new FormData();

            formData.append("title", event.target.querySelector("#newPostTitle").value);
            formData.append("body", event.target.querySelector("#newPostBody").value);

            XHR.addEventListener('load', function (e) {
                var post = document.createElement("div");
                post.setAttribute("id", JSON.parse(XHR.response)._id);
                document.querySelector("#pinnedPostBoard").appendChild(post);
                ReactDOM.render(React.createElement(Post, { postId: JSON.parse(XHR.response)._id }), document.getElementById("" + JSON.parse(XHR.response)._id));
            });

            XHR.addEventListener('error', function (e) {
                alert('Oops! Something went wrong.');
            });

            XHR.open('POST', '/posts/newPost');
            XHR.send(formData);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { "class": "container" },
                React.createElement(
                    "div",
                    { "class": "row" },
                    React.createElement(
                        "div",
                        { "class": "col" },
                        React.createElement(
                            "h6",
                            null,
                            "New Post"
                        ),
                        React.createElement(
                            "form",
                            { "class": "form-inline", onSubmit: this.submitNewPost },
                            React.createElement(
                                "div",
                                { "class": "form-group" },
                                React.createElement("input", { "class": "form-control", placeholder: "Title", id: "newPostTitle" }),
                                React.createElement("input", { "class": "form-control", placeholder: "What's on your mind?", id: "newPostBody" })
                            ),
                            React.createElement(
                                "button",
                                { type: "submit", "class": "btn" },
                                "submit"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return NewPostSection;
}(React.Component);

var Post = function (_React$Component2) {
    _inherits(Post, _React$Component2);

    function Post(props) {
        _classCallCheck(this, Post);

        var _this2 = _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this, props));

        _this2.handleFormSubmit = {
            newComment: function newComment(event) {
                var _this3 = this;

                event.preventDefault();
                this.postRequest("newComment", {
                    postId: this.props.postId,
                    body: event.target.querySelector("input").value
                }, function (post) {
                    _this3.setState({
                        post: post
                    });
                });
            },

            newReply: function newReply(event) {
                var _this4 = this;

                event.preventDefault();
                console.log("submit reply pressed");
                this.postRequest("newReply", {
                    postId: this.props.postId,
                    commentId: event.target.getAttribute("commentid"),
                    body: event.target.querySelector("input").value
                }, function (post) {
                    _this4.setState({
                        post: post
                    });
                });
            }
        };

        _this2.commentToggle = _this2.commentToggle.bind(_this2);
        for (key in _this2.handleFormSubmit) {
            _this2.handleFormSubmit[key] = _this2.handleFormSubmit[key].bind(_this2);
        }
        _this2.state = {
            isPostReceived: false,
            isCommentToggled: false,
            post: {
                "date": null,
                "hidden": null,
                "lastUpdate": null,
                "__v": null,
                "_id": null,
                "authorId": null,
                "title": null,
                "body": null,
                "comments": ["blank"]
            }
        };
        return _this2;
    }

    _createClass(Post, [{
        key: "commentToggle",
        value: function commentToggle() {
            this.setState({
                isCommentToggled: this.state.isCommentToggled === false ? true : false
            });
        }
    }, {
        key: "getRequest",
        value: function getRequest(callback) {
            var XHR = new XMLHttpRequest();

            XHR.addEventListener('load', function (e) {
                callback(JSON.parse(XHR.response));
            });

            XHR.addEventListener('error', function (e) {
                alert('Oops! Something went wrong.');
            });

            XHR.open('GET', '/posts/?postId=' + this.props.postId);
            XHR.send(null);
        }
    }, {
        key: "postRequest",
        value: function postRequest(url, data, callback) {
            var XHR = new XMLHttpRequest();
            var formData = new FormData();

            for (key in data) {
                formData.append(key, data[key]);
            }

            XHR.addEventListener('load', function (e) {
                callback(JSON.parse(XHR.response));
            });

            XHR.addEventListener('error', function (e) {
                alert('Oops! Something went wrong.');
            });

            XHR.open('POST', '/posts/' + url);
            XHR.send(formData);
        }
    }, {
        key: "loadToBlock",
        value: function loadToBlock() {
            var _this5 = this;

            this.getRequest(function (post) {
                _this5.setState({
                    post: post
                });
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.loadToBlock();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { "class": "container" },
                React.createElement(
                    "div",
                    { "class": "row" },
                    React.createElement(
                        "div",
                        { "class": "col-3 col-sm-1 h-100" },
                        React.createElement("img", { src: "images/gump.jpg", "class": "img-thumbnail" })
                    ),
                    React.createElement(
                        "div",
                        { "class": "col-11" },
                        React.createElement(
                            "p",
                            { "class": "strong" },
                            this.state.post.authorId
                        ),
                        React.createElement(
                            "p",
                            { "class": "small" },
                            this.state.post.date
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { "class": "row" },
                    React.createElement(
                        "div",
                        { "class": "col" },
                        React.createElement(
                            "p",
                            { "class": "strong" },
                            this.state.post.title
                        ),
                        React.createElement(
                            "p",
                            null,
                            this.state.post.body
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { "class": "row justify-content-between" },
                    React.createElement(
                        "div",
                        { "class": "col" },
                        React.createElement(
                            "button",
                            { type: "button", "class": "btn" },
                            "likes"
                        ),
                        React.createElement(
                            "button",
                            { type: "button", "class": "btn", onClick: this.commentToggle },
                            "Comment"
                        ),
                        React.createElement(
                            "a",
                            null,
                            this.state.post.comments.length
                        )
                    )
                ),
                React.createElement(CommentSection, { handleFormSubmit: this.handleFormSubmit, isCommentToggled: this.state.isCommentToggled, commentList: this.state.post.comments })
            );
        }
    }]);

    return Post;
}(React.Component);

var CommentSection = function (_React$Component3) {
    _inherits(CommentSection, _React$Component3);

    function CommentSection(props) {
        _classCallCheck(this, CommentSection);

        var _this6 = _possibleConstructorReturn(this, (CommentSection.__proto__ || Object.getPrototypeOf(CommentSection)).call(this, props));

        _this6.commentList = _this6.commentList.bind(_this6);
        return _this6;
    }

    _createClass(CommentSection, [{
        key: "commentList",
        value: function commentList() {
            var _this7 = this;

            return this.props.commentList.map(function (comment) {
                return React.createElement(Comment, { key: comment._id, comment: comment, handleFormSubmit: _this7.props.handleFormSubmit });
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.isCommentToggled) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { "class": "container" },
                        React.createElement(
                            "div",
                            { "class": "row" },
                            React.createElement(
                                "div",
                                { "class": "col" },
                                React.createElement(
                                    "form",
                                    { "class": "form-inline", onSubmit: this.props.handleFormSubmit.newComment },
                                    React.createElement(
                                        "div",
                                        { "class": "form-group" },
                                        React.createElement("input", { "class": "form-control", placeholder: "Your Comment here..." })
                                    ),
                                    React.createElement(
                                        "button",
                                        { type: "submit", "class": "btn" },
                                        "submit"
                                    )
                                )
                            )
                        )
                    ),
                    this.commentList()
                );
            }
            return React.createElement(
                "div",
                null,
                "blank"
            );
        }
    }]);

    return CommentSection;
}(React.Component);

var Comment = function (_React$Component4) {
    _inherits(Comment, _React$Component4);

    function Comment(props) {
        _classCallCheck(this, Comment);

        var _this8 = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));

        _this8.state = {
            isReplyToggled: false
        };
        _this8.replyToggle = _this8.replyToggle.bind(_this8);
        return _this8;
    }

    _createClass(Comment, [{
        key: "replyToggle",
        value: function replyToggle() {
            this.setState({
                isReplyToggled: this.state.isReplyToggled === false ? true : false
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { "class": "container", commentid: this.props.comment._id },
                React.createElement(
                    "div",
                    { "class": "row" },
                    React.createElement(
                        "div",
                        { "class": "col" },
                        React.createElement(
                            "h6",
                            null,
                            this.props.comment.authorId
                        ),
                        React.createElement(
                            "p",
                            { "class": "small" },
                            this.props.comment.body
                        ),
                        React.createElement(
                            "button",
                            { type: "button", "class": "btn" },
                            "like"
                        ),
                        React.createElement(
                            "button",
                            { type: "button", "class": "btn", onClick: this.replyToggle },
                            "reply"
                        )
                    )
                ),
                React.createElement(ReplySection, { commentid: this.props.comment._id, isReplyToggled: this.state.isReplyToggled, replyList: this.props.comment.replies, handleFormSubmit: this.props.handleFormSubmit })
            );
        }
    }]);

    return Comment;
}(React.Component);

var ReplySection = function (_React$Component5) {
    _inherits(ReplySection, _React$Component5);

    function ReplySection(props) {
        _classCallCheck(this, ReplySection);

        var _this9 = _possibleConstructorReturn(this, (ReplySection.__proto__ || Object.getPrototypeOf(ReplySection)).call(this, props));

        _this9.replyList = _this9.replyList.bind(_this9);
        return _this9;
    }

    _createClass(ReplySection, [{
        key: "replyList",
        value: function replyList() {
            var _this10 = this;

            return this.props.replyList.map(function (reply) {
                return React.createElement(Reply, { key: reply._id, reply: reply, commentid: _this10.props.commentid, replyid: reply._id });
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.isReplyToggled) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { "class": "container" },
                        React.createElement(
                            "div",
                            { "class": "row" },
                            React.createElement(
                                "div",
                                { "class": "col" },
                                React.createElement(
                                    "form",
                                    { "class": "form-inline", onSubmit: this.props.handleFormSubmit.newReply, commentid: this.props.commentid },
                                    React.createElement(
                                        "div",
                                        { "class": "form-group" },
                                        React.createElement("input", { "class": "form-control", placeholder: "Your Reply here..." })
                                    ),
                                    React.createElement(
                                        "button",
                                        { type: "submit", "class": "btn" },
                                        "submit"
                                    )
                                )
                            )
                        )
                    ),
                    this.replyList()
                );
            }
            return React.createElement(
                "div",
                null,
                "reply section collapsed"
            );
        }
    }]);

    return ReplySection;
}(React.Component);

var Reply = function (_React$Component6) {
    _inherits(Reply, _React$Component6);

    function Reply(props) {
        _classCallCheck(this, Reply);

        return _possibleConstructorReturn(this, (Reply.__proto__ || Object.getPrototypeOf(Reply)).call(this, props));
    }

    _createClass(Reply, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { commentid: this.props.commentid, replyid: this.props.reply._id },
                this.props.reply.body
            );
        }
    }]);

    return Reply;
}(React.Component);

var pinnedPostList = [];
var postList = [];
var currentPostListPosition = 0;
var loadPost = function loadPost(startingPosition, numberOfPosts) {
    for (i = 0; i < numberOfPosts; i++) {
        var post = document.createElement("div");
        post.setAttribute("id", postList[startingPosition + i]);
        document.querySelector("#postBoard").appendChild(post);
        ReactDOM.render(React.createElement(Post, { postId: postList[startingPosition + i] }), document.getElementById(postList[startingPosition + i]));
    }
    currentPostListPosition += numberOfPosts;
};

window.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM fully loaded and parsed');

    ReactDOM.render(React.createElement(NewPostSection, null), document.querySelector("#newPostSection"));

    if (postList.length === 0) {
        var XHR = new XMLHttpRequest();

        XHR.addEventListener('load', function (e) {
            postList = JSON.parse(XHR.response).postList;
            loadPost(0, 5);
        });

        XHR.addEventListener('error', function (e) {
            alert('unable to get post list');
        });

        XHR.open('GET', '/posts/postList');
        XHR.send(null);
    }
});

window.addEventListener("scroll", function (event) {

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight * 0.99) {
        if (currentPostListPosition < postList.length) {
            loadPost(currentPostListPosition, 5);
        } else {
            alert("Post limit exceeded, please refresh");
        }
    }
});