var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log("home.js loaded");

var Post = function (_React$Component) {
    _inherits(Post, _React$Component);

    function Post(props) {
        _classCallCheck(this, Post);

        var _this = _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this, props));

        _this.commentToggle = _this.commentToggle.bind(_this);
        _this.handleCommentSubmit = _this.handleCommentSubmit.bind(_this);
        _this.state = {
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
                "comments": []
            }
        };
        return _this;
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
            var _this2 = this;

            this.getRequest(function (post) {
                _this2.setState({
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
        key: "handleCommentSubmit",
        value: function handleCommentSubmit(event) {
            var _this3 = this;

            event.preventDefault();
            console.log("submit comment pressed");
            this.postRequest("newComment", {
                postId: this.props.postId,
                body: event.target.querySelector("input").value
            }, function (post) {
                _this3.setState({
                    post: post
                });
            });
        }
    }, {
        key: "handleReplySubmit",
        value: function handleReplySubmit(event) {
            event.preventDefault();
            this.postRequest("newReply", {
                postId: this.props.postId,
                commentId: event.target.getAttribute("commentId"),
                body: event.target.querySelector("input").value
            });
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
                React.createElement(CommentSection, { handleCommentSubmit: this.handleCommentSubmit, isCommentToggled: this.state.isCommentToggled, commentList: this.state.post.comments })
            );
        }
    }]);

    return Post;
}(React.Component);

var CommentSection = function (_React$Component2) {
    _inherits(CommentSection, _React$Component2);

    function CommentSection(props) {
        _classCallCheck(this, CommentSection);

        var _this4 = _possibleConstructorReturn(this, (CommentSection.__proto__ || Object.getPrototypeOf(CommentSection)).call(this, props));

        _this4.commentList = _this4.commentList.bind(_this4);
        return _this4;
    }

    _createClass(CommentSection, [{
        key: "commentList",
        value: function commentList() {
            return this.props.commentList.map(function (comment) {
                return React.createElement(Comment, { key: comment._id, comment: comment });
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
                                    { "class": "form-inline", onSubmit: this.props.handleCommentSubmit },
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

var Comment = function (_React$Component3) {
    _inherits(Comment, _React$Component3);

    function Comment(props) {
        _classCallCheck(this, Comment);

        var _this5 = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));

        _this5.state = {
            comment: _this5.props.comment
        };
        return _this5;
    }

    _createClass(Comment, [{
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
                            { type: "button", "class": "btn" },
                            "reply"
                        )
                    )
                )
            );
        }
    }]);

    return Comment;
}(React.Component);

var postList = [];

window.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM fully loaded and parsed');
    if (postList.length === 0) {
        var XHR = new XMLHttpRequest();

        XHR.addEventListener('load', function (e) {
            postList = JSON.parse(XHR.response).postList;
            for (i = 0; i < 5; i++) {
                var post = document.createElement("div");
                post.setAttribute("id", postList[i]);
                document.querySelector("#postBoard").appendChild(post);
                ReactDOM.render(React.createElement(Post, { postId: postList[i] }), document.getElementById(postList[i]));
            }
        });

        XHR.addEventListener('error', function (e) {
            alert('unable to get post list');
        });

        XHR.open('GET', '/posts/postList');
        XHR.send(null);
    }
});

// ReactDOM.render(<Post postId="613a0d97bd4dbb032efd8100" />, document.querySelector("#postBoard"))