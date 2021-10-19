var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentSection = function (_React$Component) {
    _inherits(CommentSection, _React$Component);

    function CommentSection(props) {
        _classCallCheck(this, CommentSection);

        var _this = _possibleConstructorReturn(this, (CommentSection.__proto__ || Object.getPrototypeOf(CommentSection)).call(this, props));

        _this.commentList = _this.commentList.bind(_this);
        return _this;
    }

    _createClass(CommentSection, [{
        key: "commentList",
        value: function commentList() {
            var _this2 = this;

            return this.props.commentList.map(function (comment) {
                return React.createElement(Comment, { key: comment._id, comment: comment, handleFormSubmit: _this2.props.handleFormSubmit, postId: _this2.props.postId });
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.isCommentToggled) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement("hr", { className: "my-0" }),
                    React.createElement(
                        "div",
                        { className: "container" },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement(
                                "div",
                                { className: "col" },
                                React.createElement(
                                    "form",
                                    { className: "form-inline", onSubmit: this.props.handleFormSubmit.newComment },
                                    React.createElement(
                                        "div",
                                        { className: "form-group" },
                                        React.createElement(
                                            "div",
                                            { className: "input-group mb-3" },
                                            React.createElement("input", { className: "form-control", placeholder: "Your Comment here..." }),
                                            React.createElement(
                                                "div",
                                                { className: "input-group-append" },
                                                React.createElement(
                                                    "button",
                                                    { type: "submit", className: "btn btn-outline-primary" },
                                                    "submit"
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    this.commentList()
                );
            }
            return React.createElement("div", null);
        }
    }]);

    return CommentSection;
}(React.Component);

var Comment = function (_React$Component2) {
    _inherits(Comment, _React$Component2);

    function Comment(props) {
        _classCallCheck(this, Comment);

        var _this3 = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));

        _this3.state = {
            isReplyToggled: false,
            isEditToggled: false
        };
        _this3.replyToggle = _this3.replyToggle.bind(_this3);
        _this3.editToggle = _this3.editToggle.bind(_this3);
        return _this3;
    }

    _createClass(Comment, [{
        key: "editToggle",
        value: function editToggle(event) {
            event.preventDefault();
            this.setState({
                isEditToggled: this.state.isEditToggled === false ? true : false
            });
        }
    }, {
        key: "replyToggle",
        value: function replyToggle() {
            this.setState({
                isReplyToggled: this.state.isReplyToggled === false ? true : false
            });
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
            if (this.props.comment.body != prevProps.comment.body) this.setState({
                isEditToggled: false
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "container", commentid: this.props.comment._id },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-10 col-sm-11" },
                        React.createElement(UserName, { userId: this.props.comment.authorId }),
                        React.createElement(ContentBody, { context: "comment", postId: this.props.postId, commentId: this.props.comment._id, body: this.props.comment.body, isEditToggled: this.state.isEditToggled, editToggle: this.editToggle, handleEditSubmit: this.props.handleFormSubmit.edit }),
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-sm btn-primary", onClick: this.replyToggle },
                            "reply ",
                            React.createElement(
                                "span",
                                { className: "badge badge-light" },
                                this.props.comment.replies.length
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-2 col-sm-1" },
                        React.createElement(Dropdown, { context: "comment", postId: this.props.postId, commentId: this.props.comment._id, editToggle: this.editToggle, handleDeleteSubmit: this.props.handleFormSubmit.delete })
                    )
                ),
                React.createElement(ReplySection, { postId: this.props.postId, commentId: this.props.comment._id, isReplyToggled: this.state.isReplyToggled, replyList: this.props.comment.replies, handleFormSubmit: this.props.handleFormSubmit })
            );
        }
    }]);

    return Comment;
}(React.Component);