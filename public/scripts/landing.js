var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log("landing script loaded");
console.log("correct version");

var LoginRegisterControl = function (_React$Component) {
    _inherits(LoginRegisterControl, _React$Component);

    function LoginRegisterControl(props) {
        _classCallCheck(this, LoginRegisterControl);

        var _this = _possibleConstructorReturn(this, (LoginRegisterControl.__proto__ || Object.getPrototypeOf(LoginRegisterControl)).call(this, props));

        _this.state = {
            registerOrLogin: 0
        };
        _this.switch = _this.switch.bind(_this);
        return _this;
    }

    _createClass(LoginRegisterControl, [{
        key: "switch",
        value: function _switch() {
            console.log("switch clicked");
            if (this.state.registerOrLogin === 0) {
                this.setState({
                    registerOrLogin: 1
                });
            } else {
                this.setState({
                    registerOrLogin: 0
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return this.state.registerOrLogin === 0 ? React.createElement(Register, { switchToLogin: this.switch }) : React.createElement(Login, { switchToRegister: this.switch });
        }
    }]);

    return LoginRegisterControl;
}(React.Component);

var Register = function (_React$Component2) {
    _inherits(Register, _React$Component2);

    function Register(props) {
        _classCallCheck(this, Register);

        var _this2 = _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).call(this, props));

        _this2.state = {
            msg: ""
        };
        _this2.submit = _this2.submit.bind(_this2);
        return _this2;
    }

    _createClass(Register, [{
        key: "submit",
        value: function submit(e) {
            e.preventDefault();
            var XHR = new XMLHttpRequest(),
                FD = new FormData();

            // Push our data into our FormData object
            e.target.querySelectorAll("input").forEach(function (input) {
                FD.append(input.id, input.value);
            });

            // Define what happens on successful data submission
            XHR.addEventListener('load', function (e) {
                document.querySelector("#msg").innerHTML = JSON.parse(XHR.response).msg;
            });

            // Define what happens in case of error
            XHR.addEventListener(' error', function (e) {
                alert('Oops! Something went wrong.');
            });
            // Set up our request
            XHR.open('POST', '/auth/register');
            // Send our FormData object; HTTP headers are set automatically
            XHR.send(FD);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.submit },
                React.createElement(
                    "fieldset",
                    null,
                    React.createElement(
                        "legend",
                        null,
                        "Register"
                    ),
                    React.createElement(
                        "label",
                        null,
                        "Username:"
                    ),
                    React.createElement("input", { id: "username", type: "text" }),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        null,
                        "First Name:"
                    ),
                    React.createElement("input", { id: "firstName", type: "text" }),
                    React.createElement(
                        "label",
                        null,
                        "Last Name:"
                    ),
                    React.createElement("input", { id: "lastName", type: "text" }),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        null,
                        "Email:"
                    ),
                    React.createElement("input", { id: "email", type: "text" }),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        null,
                        "Password:"
                    ),
                    React.createElement("input", { id: "password", type: "password" }),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        null,
                        "Confirm Password:"
                    ),
                    React.createElement("input", { id: "confirmPassword", type: "password" }),
                    React.createElement("br", null),
                    React.createElement(
                        "button",
                        { type: "submit" },
                        "Submit"
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "a",
                        { onClick: this.props.switchToLogin },
                        "Already have an account? Login here."
                    ),
                    React.createElement("br", null),
                    React.createElement("p", { id: "msg" })
                )
            );
        }
    }]);

    return Register;
}(React.Component);

var Login = function (_React$Component3) {
    _inherits(Login, _React$Component3);

    function Login(props) {
        _classCallCheck(this, Login);

        var _this3 = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

        _this3.state = {};
        return _this3;
    }

    _createClass(Login, [{
        key: "submit",
        value: function submit(e) {
            e.preventDefault();
            var XHR = new XMLHttpRequest(),
                FD = new FormData();

            // Push our data into our FormData object
            e.target.querySelectorAll("input").forEach(function (input) {
                FD.append(input.id, input.value);
            });

            // Define what happens on successful data submission
            XHR.addEventListener('load', function (e) {
                var msg = "" + XHR.status;
                if (XHR.status === 200) {
                    var url = window.location.origin + "/home";
                    window.location.replace(url);
                } else if (XHR.status === 401) {
                    msg += ": invalid username/password.";
                }
                document.querySelector("#msg").innerHTML = msg;
            });

            // Define what happens in case of error
            XHR.addEventListener(' error', function (e) {
                alert('Oops! Something went wrong.');
            });
            // Set up our request
            XHR.open('POST', '/auth/login');
            // Send our FormData object; HTTP headers are set automatically
            XHR.send(FD);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.submit },
                React.createElement(
                    "fieldset",
                    null,
                    React.createElement(
                        "legend",
                        null,
                        "Login"
                    ),
                    React.createElement(
                        "label",
                        null,
                        "Username:"
                    ),
                    React.createElement("input", { id: "username", type: "text" }),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        null,
                        "Password:"
                    ),
                    React.createElement("input", { id: "password", type: "password" }),
                    React.createElement("br", null),
                    React.createElement(
                        "button",
                        { type: "submit" },
                        "Submit"
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "a",
                        { onClick: this.props.switchToRegister },
                        "Don't have an account yet? Register Here."
                    ),
                    React.createElement("br", null),
                    React.createElement("p", { id: "msg" })
                )
            );
        }
    }]);

    return Login;
}(React.Component);

ReactDOM.render(React.createElement(LoginRegisterControl, null), document.querySelector("#loginOrRegister"));