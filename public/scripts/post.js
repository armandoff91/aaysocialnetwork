var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Post = function (_React$Component) {
    _inherits(Post, _React$Component);

    function Post(props) {
        _classCallCheck(this, Post);

        var _this = _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this, props));

        _this.state = {
            post: props.post
        };
        return _this;
    }
    // const postSchema = new mongoose.Schema({
    //     title:  String,
    //     authorId: {required: true, type: String},
    //     body:   String,
    //     comments: [commentSchema],
    //     date: { type: Number, default: 0 },
    //     hidden: {type: Boolean, default: false},
    //     meta: {upvotes: Number, downvotes: Number},
    //     lastUpdate: {type: Number, default: 0},
    //     __v: {type: Number, default: 1.01}
    // });


    _createClass(Post, [{
        key: "refresh",
        value: function refresh() {
            this.setState({});
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { "class": "postContent" },
                React.createElement(Potrait, null)
            );
        }
    }]);

    return Post;
}(React.Component);

var Potrait = function (_React$Component2) {
    _inherits(Potrait, _React$Component2);

    function Potrait(props) {
        _classCallCheck(this, Potrait);

        return _possibleConstructorReturn(this, (Potrait.__proto__ || Object.getPrototypeOf(Potrait)).call(this, props));
    }

    _createClass(Potrait, [{
        key: "render",
        value: function render() {
            return React.createElement("div", { "class": "potrait" });
        }
    }]);

    return Potrait;
}(React.Component);