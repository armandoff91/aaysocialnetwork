var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentBody = function (_React$Component) {
    _inherits(ContentBody, _React$Component);

    function ContentBody(props) {
        _classCallCheck(this, ContentBody);

        var _this = _possibleConstructorReturn(this, (ContentBody.__proto__ || Object.getPrototypeOf(ContentBody)).call(this, props));

        _this.state = {
            body: _this.props.body
        };
        return _this;
    }

    _createClass(ContentBody, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
            if (this.props.body != prevProps.body) {
                this.setState({
                    body: this.props.body
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            if (this.props.isEditToggled) {
                return React.createElement(
                    "form",
                    { context: this.props.context, postid: this.props.postId, commentid: this.props.commentId, replyid: this.props.replyId, className: "form-inline", onSubmit: this.props.handleEditSubmit },
                    React.createElement("input", { type: "text", className: "form-control", id: "", value: this.state.body, onChange: function onChange(e) {
                            _this2.setState({ body: e.target.value });
                        }, autofocus: "true" }),
                    React.createElement(
                        "a",
                        { type: "", onClick: this.props.editToggle, className: "btn btn-primary mb-2" },
                        "Cancel"
                    ),
                    React.createElement(
                        "button",
                        { type: "submit", className: "btn btn-primary mb-2" },
                        "Submit"
                    )
                );
            }
            return React.createElement(
                "span",
                null,
                this.state.body
            );
        }
    }]);

    return ContentBody;
}(React.Component);