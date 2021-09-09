console.log("home.js loaded")

class Post extends React.Component{
    constructor(props) {
        super(props)
        this.commentToggle = this.commentToggle.bind(this)
        this.state = {
            isPostReceived: false,
            isCommentToggled: false
        }
    }

    commentToggle() {
        this.setState({
            isCommentToggled: this.state.isCommentToggled === false? true : false
        })
    }

    query(postId, callback) {
        const XHR = new XMLHttpRequest()

        XHR.addEventListener('load', function(e) {
            callback(XHR.response)
            // setState here
        });

        XHR.addEventListener('error', function(e) {
            alert( 'Oops! Something went wrong.' );
        } );

        XHR.open( 'GET', '/posts/?postId=' + postId );
        XHR.send(null);
    }

    render() {
        return <div class="container">
            <div class="row">
                <div class="col-3 col-sm-1 h-100"><img src="images/gump.jpg" class="img-thumbnail"></img></div>
                <div class="col-11">
                    <p class="strong">Author name</p>
                    <p class="small">date</p>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p class="strong">What is Lorem Ipsum?</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>
            <div class="row justify-content-between">
                <div class="col">
                    <button type="button" class="btn">likes</button>
                    <button type="button" class="btn" onClick={this.commentToggle}>Comment</button>
                    <a>num of comments</a>
                </div>
            </div>
            <CommentSection isCommentToggled={this.state.isCommentToggled}/>
        </div>
    }
}

class CommentSection extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.isCommentToggled) {
            return <div>
                commentLIst
            </div>
        }
        return <div>
            blank
        </div>
    }
}

ReactDOM.render(<Post />, document.querySelector("#postBoard"))