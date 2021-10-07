var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log("home.js loaded");

var pinnedPostList = [];
var postList = [];
var userList = {};
var currentPostListPosition = 0;

var UserName = function (_React$Component) {
    _inherits(UserName, _React$Component);

    function UserName(props) {
        _classCallCheck(this, UserName);

        var _this = _possibleConstructorReturn(this, (UserName.__proto__ || Object.getPrototypeOf(UserName)).call(this, props));

        _this.state = {
            username: null
        };
        _this.getUserName = _this.getUserName.bind(_this);
        _this.mountUsername = _this.mountUsername.bind(_this);
        return _this;
    }

    _createClass(UserName, [{
        key: 'getUserName',
        value: function getUserName(callback) {
            var XHR = new XMLHttpRequest();

            XHR.addEventListener('load', function (e) {
                callback(JSON.parse(XHR.response));
            });

            XHR.open('GET', '/user?userId=' + this.props.userId);
            XHR.send(null);
        }
    }, {
        key: 'mountUsername',
        value: function mountUsername() {
            var _this2 = this;

            if (userList[this.props.userId] !== undefined) {
                this.setState({
                    username: userList[this.props.userId]
                });
            } else {
                this.getUserName(function (response) {
                    userList[_this2.props.userId] = response.firstName + " " + response.lastName != "undefined undefined" ? response.firstName + " " + response.lastName : _this2.props.userId;
                    _this2.setState({
                        username: userList[_this2.props.userId]
                    });
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.userId !== prevProps.userId && this.props.userId !== null) {
                this.mountUsername();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.userId !== null) {
                this.mountUsername();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'p',
                { className: 'strong' },
                this.state.username
            );
        }
    }]);

    return UserName;
}(React.Component);

var Dropdown = function (_React$Component2) {
    _inherits(Dropdown, _React$Component2);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        var _this3 = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

        _this3.handleUpdateRequest = _this3.handleUpdateRequest.bind(_this3);
        _this3.handleDeleteRequest = _this3.handleDeleteRequest.bind(_this3);
        return _this3;
    }

    _createClass(Dropdown, [{
        key: 'postRequest',
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
        key: 'handleUpdateRequest',
        value: function handleUpdateRequest() {}
    }, {
        key: 'handleDeleteRequest',
        value: function handleDeleteRequest() {}
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'dropdown' },
                React.createElement('a', { className: 'btn btn-secondary dropdown-toggle', href: '#', role: 'button', id: 'dropdownMenuLink', 'data-bs-toggle': 'dropdown', 'aria-expanded': 'false' }),
                React.createElement(
                    'ul',
                    { className: 'dropdown-menu', 'aria-labelledby': 'dropdownMenuLink' },
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { className: 'dropdown-item', href: '#' },
                            'Edit'
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'a',
                            { className: 'dropdown-item', href: '#' },
                            'Delete'
                        )
                    )
                )
            );
        }
    }]);

    return Dropdown;
}(React.Component);

var NewPostSection = function (_React$Component3) {
    _inherits(NewPostSection, _React$Component3);

    function NewPostSection(props) {
        _classCallCheck(this, NewPostSection);

        var _this4 = _possibleConstructorReturn(this, (NewPostSection.__proto__ || Object.getPrototypeOf(NewPostSection)).call(this, props));

        _this4.submitNewPost = _this4.submitNewPost.bind(_this4);
        return _this4;
    }

    _createClass(NewPostSection, [{
        key: 'submitNewPost',
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
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col' },
                        React.createElement(
                            'h6',
                            null,
                            'New Post'
                        ),
                        React.createElement(
                            'form',
                            { className: 'form-inline', onSubmit: this.submitNewPost },
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement('input', { className: 'form-control', placeholder: 'Title', id: 'newPostTitle' }),
                                React.createElement('input', { className: 'form-control', placeholder: 'What\'s on your mind?', id: 'newPostBody' })
                            ),
                            React.createElement(
                                'button',
                                { type: 'submit', className: 'btn' },
                                'submit'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return NewPostSection;
}(React.Component);

var Post = function (_React$Component4) {
    _inherits(Post, _React$Component4);

    function Post(props) {
        _classCallCheck(this, Post);

        var _this5 = _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this, props));

        _this5.handleFormSubmit = {
            newComment: function newComment(event) {
                var _this6 = this;

                event.preventDefault();
                this.postRequest("newComment", {
                    postId: this.props.postId,
                    body: event.target.querySelector("input").value
                }, function (post) {
                    _this6.setState({
                        post: post
                    });
                });
            },

            newReply: function newReply(event) {
                var _this7 = this;

                event.preventDefault();
                console.log("submit reply pressed");
                this.postRequest("newReply", {
                    postId: this.props.postId,
                    commentId: event.target.getAttribute("commentid"),
                    body: event.target.querySelector("input").value
                }, function (post) {
                    _this7.setState({
                        post: post
                    });
                });
            }
        };

        _this5.commentToggle = _this5.commentToggle.bind(_this5);
        _this5.displayTime = _this5.displayTime.bind(_this5);
        for (key in _this5.handleFormSubmit) {
            _this5.handleFormSubmit[key] = _this5.handleFormSubmit[key].bind(_this5);
        }
        _this5.state = {
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
        return _this5;
    }

    _createClass(Post, [{
        key: 'commentToggle',
        value: function commentToggle() {
            this.setState({
                isCommentToggled: this.state.isCommentToggled === false ? true : false
            });
        }
    }, {
        key: 'getRequest',
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
        key: 'postRequest',
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
        key: 'loadToBlock',
        value: function loadToBlock() {
            var _this8 = this;

            this.getRequest(function (post) {
                _this8.setState({
                    isPostReceived: true,
                    post: post
                });
            });
        }
    }, {
        key: 'displayTime',
        value: function displayTime(n) {
            return moment(n).format("DD MMM YYYY hh:mm a");
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadToBlock();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'container my-5' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-3 col-sm-1 h-100' },
                        React.createElement('img', { src: 'images/portrait_2.png', className: 'img-thumbnail' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-11' },
                        React.createElement(UserName, { userId: this.state.post.authorId }),
                        React.createElement(
                            'p',
                            { className: 'small' },
                            this.displayTime(this.state.post.date)
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-11' },
                        React.createElement(
                            'p',
                            { className: 'strong' },
                            this.state.post.title
                        ),
                        React.createElement(
                            'p',
                            null,
                            this.state.post.body
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-1' },
                        React.createElement(Dropdown, null)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row justify-content-between' },
                    React.createElement(
                        'div',
                        { className: 'col' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn' },
                            'likes'
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn', onClick: this.commentToggle },
                            'Comment'
                        ),
                        React.createElement(
                            'a',
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

var CommentSection = function (_React$Component5) {
    _inherits(CommentSection, _React$Component5);

    function CommentSection(props) {
        _classCallCheck(this, CommentSection);

        var _this9 = _possibleConstructorReturn(this, (CommentSection.__proto__ || Object.getPrototypeOf(CommentSection)).call(this, props));

        _this9.commentList = _this9.commentList.bind(_this9);
        return _this9;
    }

    _createClass(CommentSection, [{
        key: 'commentList',
        value: function commentList() {
            var _this10 = this;

            return this.props.commentList.map(function (comment) {
                return React.createElement(Comment, { key: comment._id, comment: comment, handleFormSubmit: _this10.props.handleFormSubmit });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.isCommentToggled) {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: 'container' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col' },
                                React.createElement(
                                    'form',
                                    { className: 'form-inline', onSubmit: this.props.handleFormSubmit.newComment },
                                    React.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        React.createElement('input', { className: 'form-control', placeholder: 'Your Comment here...' })
                                    ),
                                    React.createElement(
                                        'button',
                                        { type: 'submit', className: 'btn' },
                                        'submit'
                                    )
                                )
                            )
                        )
                    ),
                    this.commentList()
                );
            }
            return React.createElement(
                'div',
                null,
                'blank'
            );
        }
    }]);

    return CommentSection;
}(React.Component);

var Comment = function (_React$Component6) {
    _inherits(Comment, _React$Component6);

    function Comment(props) {
        _classCallCheck(this, Comment);

        var _this11 = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));

        _this11.state = {
            isReplyToggled: false
        };
        _this11.replyToggle = _this11.replyToggle.bind(_this11);
        return _this11;
    }

    _createClass(Comment, [{
        key: 'replyToggle',
        value: function replyToggle() {
            this.setState({
                isReplyToggled: this.state.isReplyToggled === false ? true : false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'container', commentid: this.props.comment._id },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-11' },
                        React.createElement(UserName, { userId: this.props.comment.authorId }),
                        React.createElement(
                            'p',
                            { className: 'small' },
                            this.props.comment.body
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn' },
                            'like'
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn', onClick: this.replyToggle },
                            'reply'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-1' },
                        React.createElement(Dropdown, null)
                    )
                ),
                React.createElement(ReplySection, { commentid: this.props.comment._id, isReplyToggled: this.state.isReplyToggled, replyList: this.props.comment.replies, handleFormSubmit: this.props.handleFormSubmit })
            );
        }
    }]);

    return Comment;
}(React.Component);

var ReplySection = function (_React$Component7) {
    _inherits(ReplySection, _React$Component7);

    function ReplySection(props) {
        _classCallCheck(this, ReplySection);

        var _this12 = _possibleConstructorReturn(this, (ReplySection.__proto__ || Object.getPrototypeOf(ReplySection)).call(this, props));

        _this12.replyList = _this12.replyList.bind(_this12);
        return _this12;
    }

    _createClass(ReplySection, [{
        key: 'replyList',
        value: function replyList() {
            var _this13 = this;

            return this.props.replyList.map(function (reply) {
                return React.createElement(Reply, { key: reply._id, reply: reply, commentid: _this13.props.commentid, replyid: reply._id });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.isReplyToggled) {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: 'container' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col' },
                                React.createElement(
                                    'form',
                                    { className: 'form-inline', onSubmit: this.props.handleFormSubmit.newReply, commentid: this.props.commentid },
                                    React.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        React.createElement('input', { className: 'form-control', placeholder: 'Your Reply here...' })
                                    ),
                                    React.createElement(
                                        'button',
                                        { type: 'submit', className: 'btn' },
                                        'submit'
                                    )
                                )
                            )
                        )
                    ),
                    this.replyList()
                );
            }
            return React.createElement(
                'div',
                null,
                'reply section collapsed'
            );
        }
    }]);

    return ReplySection;
}(React.Component);

var Reply = function (_React$Component8) {
    _inherits(Reply, _React$Component8);

    function Reply(props) {
        _classCallCheck(this, Reply);

        return _possibleConstructorReturn(this, (Reply.__proto__ || Object.getPrototypeOf(Reply)).call(this, props));
    }

    _createClass(Reply, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'row', commentid: this.props.commentid, replyid: this.props.reply._id },
                React.createElement(
                    'div',
                    { className: 'col-11' },
                    React.createElement(UserName, { userId: this.props.reply.authorId }),
                    React.createElement(
                        'p',
                        null,
                        this.props.reply.body
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-1' },
                    React.createElement(Dropdown, null)
                )
            );
        }
    }]);

    return Reply;
}(React.Component);

function sortPostListByDate() {
    postList.sort(function (a, b) {
        if (a[1] > b[1]) {
            return -1;
        }
        return 1;
    });
}

var loadPost = function loadPost(startingPosition, numberOfPosts) {
    for (i = 0; i < numberOfPosts; i++) {
        var post = document.createElement("div");
        post.setAttribute("id", postList[startingPosition + i][0]);
        document.querySelector("#postBoard").appendChild(post);
        ReactDOM.render(React.createElement(Post, { postId: postList[startingPosition + i][0] }), document.getElementById(postList[startingPosition + i][0]));
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
            sortPostListByDate();
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
        }
    }
});