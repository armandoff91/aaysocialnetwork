var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewPostSection = function (_React$Component) {
    _inherits(NewPostSection, _React$Component);

    function NewPostSection(props) {
        _classCallCheck(this, NewPostSection);

        var _this = _possibleConstructorReturn(this, (NewPostSection.__proto__ || Object.getPrototypeOf(NewPostSection)).call(this, props));

        _this.submitNewPost = _this.submitNewPost.bind(_this);
        _this.bodyInput = _this.bodyInput.bind(_this);
        _this.state = {
            bodyInput: ""
        };
        return _this;
    }

    _createClass(NewPostSection, [{
        key: "onInput",
        value: function onInput(event, callback) {
            var value = event.target.value;
            callback(value);
        }
    }, {
        key: "bodyInput",
        value: function bodyInput() {
            var _this2 = this;

            this.onInput(event, function (input) {
                _this2.setState({
                    bodyInput: input,
                    isSubmitEnabled: input.length > 0 ? true : false
                });
            });
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event, callback) {
            event.preventDefault();
            var XHR = new XMLHttpRequest();
            var formData = new FormData();

            formData.append("body", this.state.bodyInput);

            XHR.addEventListener('load', function (e) {
                var post = document.createElement("div");
                post.setAttribute("id", JSON.parse(XHR.response)._id);
                document.querySelector("#pinnedPostBoard").appendChild(post);
                if (Object.keys(JSON.parse(XHR.response)).includes("_id")) {
                    ReactDOM.render(React.createElement(Post, { postId: JSON.parse(XHR.response)._id }), document.getElementById("" + JSON.parse(XHR.response)._id));
                    event.target.querySelector("#newPostBody").value = "";
                    callback();
                } else {
                    alert(JSON.parse(XHR.response).msg);
                }
            });

            XHR.addEventListener('error', function (e) {
                alert('Oops! Something went wrong.');
            });

            XHR.open('POST', '/posts/newPost');
            XHR.send(formData);
        }
    }, {
        key: "submitNewPost",
        value: function submitNewPost() {
            var _this3 = this;

            this.onSubmit(event, function () {
                _this3.setState({
                    bodyInput: ""
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "container bg-white rounded my-3 p-2" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col" },
                        React.createElement(
                            "form",
                            { className: "form-inline", onSubmit: this.submitNewPost },
                            React.createElement(
                                "div",
                                { className: "form-group" },
                                React.createElement("textarea", { className: "form-control", placeholder: "What's on your mind?", id: "newPostBody", onInput: this.bodyInput })
                            ),
                            this.state.isSubmitEnabled ? React.createElement(
                                "button",
                                { type: "submit", className: "btn btn-primary btn-sm mt-2" },
                                "Post"
                            ) : React.createElement(
                                "button",
                                { type: "submit", className: "btn btn-primary btn-sm mt-2", disabled: true },
                                "Post"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return NewPostSection;
}(React.Component);