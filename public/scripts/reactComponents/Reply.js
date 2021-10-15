var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReplySection = function (_React$Component) {
    _inherits(ReplySection, _React$Component);

    function ReplySection(props) {
        _classCallCheck(this, ReplySection);

        var _this = _possibleConstructorReturn(this, (ReplySection.__proto__ || Object.getPrototypeOf(ReplySection)).call(this, props));

        _this.replyList = _this.replyList.bind(_this);
        return _this;
    }

    _createClass(ReplySection, [{
        key: "replyList",
        value: function replyList() {
            var _this2 = this;

            return this.props.replyList.map(function (reply) {
                return React.createElement(Reply, { key: reply._id, reply: reply, postId: _this2.props.postId, commentId: _this2.props.commentId, replyId: reply._id, handleFormSubmit: _this2.props.handleFormSubmit });
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
                        { className: "container" },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement(
                                "div",
                                { className: "col" },
                                React.createElement(
                                    "form",
                                    { className: "form-inline", onSubmit: this.props.handleFormSubmit.newReply, commentId: this.props.commentId },
                                    React.createElement(
                                        "div",
                                        { className: "form-group" },
                                        React.createElement("input", { className: "form-control", placeholder: "Your Reply here..." })
                                    ),
                                    React.createElement(
                                        "button",
                                        { type: "submit", className: "btn" },
                                        "submit"
                                    )
                                )
                            )
                        )
                    ),
                    this.replyList()
                );
            }
            return React.createElement("div", null);
        }
    }]);

    return ReplySection;
}(React.Component);

var Reply = function (_React$Component2) {
    _inherits(Reply, _React$Component2);

    function Reply(props) {
        _classCallCheck(this, Reply);

        var _this3 = _possibleConstructorReturn(this, (Reply.__proto__ || Object.getPrototypeOf(Reply)).call(this, props));

        _this3.state = {
            isEditToggled: false
        };
        _this3.editToggle = _this3.editToggle.bind(_this3);
        return _this3;
    }

    _createClass(Reply, [{
        key: "editToggle",
        value: function editToggle(event) {
            event.preventDefault();
            this.setState({
                isEditToggled: this.state.isEditToggled === false ? true : false
            });
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
            if (this.props.reply.body != prevProps.reply.body) this.setState({
                isEditToggled: false
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "row", commentId: this.props.commentId, replyId: this.props.replyId },
                React.createElement(
                    "div",
                    { className: "col-10 col-sm-11" },
                    React.createElement(UserName, { userId: this.props.reply.authorId }),
                    React.createElement(ContentBody, { context: "reply", postId: this.props.postId, commentId: this.props.commentId, replyId: this.props.replyId, body: this.props.reply.body, isEditToggled: this.state.isEditToggled, editToggle: this.editToggle, handleEditSubmit: this.props.handleFormSubmit.edit })
                ),
                React.createElement(
                    "div",
                    { className: "col-2 col-sm-1" },
                    React.createElement(Dropdown, { context: "reply", postId: this.props.postId, commentId: this.props.commentId, replyId: this.props.replyId, editToggle: this.editToggle, handleDeleteSubmit: this.props.handleFormSubmit.delete })
                )
            );
        }
    }]);

    return Reply;
}(React.Component);