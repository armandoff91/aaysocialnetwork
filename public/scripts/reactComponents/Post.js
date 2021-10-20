var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Post = function (_React$Component) {
    _inherits(Post, _React$Component);

    function Post(props) {
        _classCallCheck(this, Post);

        var _this = _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this, props));

        _this.handleFormSubmit = {
            newComment: function newComment(event) {
                var _this2 = this;

                event.preventDefault();
                this.postRequest("newComment", {
                    postId: this.props.postId,
                    body: event.target.querySelector("input").value
                }, function (res) {
                    if (Object.keys(res).includes("_id")) {
                        _this2.setState({
                            post: res
                        });
                    } else {
                        alert(res.msg);
                    }
                });
            },

            newReply: function newReply(event) {
                var _this3 = this;

                event.preventDefault();
                this.postRequest("newReply", {
                    postId: this.props.postId,
                    commentId: event.target.getAttribute("commentid"),
                    body: event.target.querySelector("input").value
                }, function (res) {
                    if (Object.keys(res).includes("_id")) {
                        _this3.setState({
                            post: res
                        });
                    } else {
                        alert(res.msg);
                    }
                });
            },

            edit: function edit(event) {
                var _this4 = this;

                event.preventDefault();
                this.postRequest("edit" + event.target.getAttribute("context"), {
                    postId: event.target.getAttribute("postid"),
                    commentId: event.target.getAttribute("commentid"),
                    replyId: event.target.getAttribute("replyid"),
                    body: event.target.querySelector("input").value
                }, function (res) {
                    if (Object.keys(res).includes("_id")) {
                        _this4.setState({
                            post: res,
                            isEditToggled: false
                        });
                    } else {
                        alert(res.msg);
                    }
                });
            },

            delete: function _delete(event) {
                var _this5 = this;

                event.preventDefault();
                if (confirm("Are you sure you want to delete the content?")) {
                    this.postRequest("delete" + event.target.getAttribute("context"), {
                        postId: event.target.getAttribute("postid"),
                        commentId: event.target.getAttribute("commentid"),
                        replyId: event.target.getAttribute("replyid")
                    }, function (response) {
                        if (response.hasOwnProperty("msg")) {
                            alert(response.msg);
                            if (response.msg === "Post deleted.") {
                                location.reload();
                                return false;
                            }
                        } else {
                            _this5.setState({
                                post: response
                            });
                        }
                    });
                } else {
                    alert("delete request cancelled.");
                }
            }
        };

        _this.commentToggle = _this.commentToggle.bind(_this);
        _this.editToggle = _this.editToggle.bind(_this);
        _this.displayTime = _this.displayTime.bind(_this);
        for (key in _this.handleFormSubmit) {
            _this.handleFormSubmit[key] = _this.handleFormSubmit[key].bind(_this);
        }
        _this.state = {
            isPostReceived: false,
            isCommentToggled: false,
            isEditToggled: false,
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
            var _this6 = this;

            this.getRequest(function (post) {
                _this6.setState({
                    isPostReceived: true,
                    post: post
                });
            });
        }
    }, {
        key: "displayTime",
        value: function displayTime(n) {
            return moment(n).format("DD MMM YYYY hh:mm a");
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.loadToBlock();
        }
    }, {
        key: "editToggle",
        value: function editToggle(event) {
            event.preventDefault();
            this.setState({
                isEditToggled: this.state.isEditToggled === false ? true : false
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "container rounded bg-white my-3 p-2" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-3 col-sm-1 h-100" },
                        React.createElement("img", { src: "images/portrait_2.png", className: "img-thumbnail" })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-9 col-sm-11" },
                        React.createElement(UserName, { userId: this.state.post.authorId }),
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "p",
                                { className: "small" },
                                this.displayTime(this.state.post.date)
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-10 col-sm-11" },
                        React.createElement(
                            "p",
                            { className: "strong" },
                            this.state.post.title
                        ),
                        React.createElement(ContentBody, { context: "post", postId: this.state.post._id, body: this.state.post.body, isEditToggled: this.state.isEditToggled, editToggle: this.editToggle, handleEditSubmit: this.handleFormSubmit.edit })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-2 col-sm-1" },
                        React.createElement(Dropdown, { context: "post", postId: this.state.post._id, editToggle: this.editToggle, handleDeleteSubmit: this.handleFormSubmit.delete })
                    )
                ),
                React.createElement("hr", { className: "my-0" }),
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col mt-2" },
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-primary btn-sm", onClick: this.commentToggle },
                            "Comment ",
                            React.createElement(
                                "span",
                                { className: "badge badge-light" },
                                this.state.post.comments.length
                            )
                        )
                    )
                ),
                React.createElement(CommentSection, { handleFormSubmit: this.handleFormSubmit, isCommentToggled: this.state.isCommentToggled, commentList: this.state.post.comments, postId: this.state.post._id })
            );
        }
    }]);

    return Post;
}(React.Component);