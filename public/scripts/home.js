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
        _this.state = {
            isPostReceived: false,
            isCommentToggled: false
        };
        return _this;
    }

    _createClass(Post, [{
        key: 'commentToggle',
        value: function commentToggle() {
            this.setState({
                isCommentToggled: this.state.isCommentToggled === false ? true : false
            });
        }
    }, {
        key: 'query',
        value: function query(postId, callback) {
            var XHR = new XMLHttpRequest();

            XHR.addEventListener('load', function (e) {
                callback(XHR.response);
                // setState here
            });

            XHR.addEventListener('error', function (e) {
                alert('Oops! Something went wrong.');
            });

            XHR.open('GET', '/posts/?postId=' + postId);
            XHR.send(null);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { 'class': 'container' },
                React.createElement(
                    'div',
                    { 'class': 'row' },
                    React.createElement(
                        'div',
                        { 'class': 'col-3 col-sm-1 h-100' },
                        React.createElement('img', { src: 'images/gump.jpg', 'class': 'img-thumbnail' })
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'col-11' },
                        React.createElement(
                            'p',
                            { 'class': 'strong' },
                            'Author name'
                        ),
                        React.createElement(
                            'p',
                            { 'class': 'small' },
                            'date'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'row' },
                    React.createElement(
                        'div',
                        { 'class': 'col' },
                        React.createElement(
                            'p',
                            { 'class': 'strong' },
                            'What is Lorem Ipsum?'
                        ),
                        React.createElement(
                            'p',
                            null,
                            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { 'class': 'row justify-content-between' },
                    React.createElement(
                        'div',
                        { 'class': 'col' },
                        React.createElement(
                            'button',
                            { type: 'button', 'class': 'btn' },
                            'likes'
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', 'class': 'btn', onClick: this.commentToggle },
                            'Comment'
                        ),
                        React.createElement(
                            'a',
                            null,
                            'num of comments'
                        )
                    )
                ),
                React.createElement(CommentSection, { isCommentToggled: this.state.isCommentToggled })
            );
        }
    }]);

    return Post;
}(React.Component);

var CommentSection = function (_React$Component2) {
    _inherits(CommentSection, _React$Component2);

    function CommentSection(props) {
        _classCallCheck(this, CommentSection);

        return _possibleConstructorReturn(this, (CommentSection.__proto__ || Object.getPrototypeOf(CommentSection)).call(this, props));
    }

    _createClass(CommentSection, [{
        key: 'render',
        value: function render() {
            if (this.props.isCommentToggled) {
                return React.createElement(
                    'div',
                    null,
                    'commentLIst'
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

ReactDOM.render(React.createElement(Post, null), document.querySelector("#postBoard"));