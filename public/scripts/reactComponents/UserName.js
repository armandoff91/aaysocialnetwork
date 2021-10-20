var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
                'div',
                { className: 'strong' },
                this.state.username
            );
        }
    }]);

    return UserName;
}(React.Component);