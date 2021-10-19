var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_React$Component) {
    _inherits(Dropdown, _React$Component);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        return _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));
    }

    _createClass(Dropdown, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "dropdown" },
                React.createElement("a", { className: "btn btn-outline-secondary dropdown-toggle", href: "#", role: "button", id: "dropdownMenuLink", "data-bs-toggle": "dropdown", "aria-expanded": "false" }),
                React.createElement(
                    "ul",
                    { className: "dropdown-menu", "aria-labelledby": "dropdownMenuLink" },
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { className: "dropdown-item", onClick: this.props.editToggle },
                            "Edit"
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { className: "dropdown-item", onClick: this.props.handleDeleteSubmit, context: this.props.context, postid: this.props.postId, commentid: this.props.commentId, replyid: this.props.replyId },
                            "Delete"
                        )
                    )
                )
            );
        }
    }]);

    return Dropdown;
}(React.Component);