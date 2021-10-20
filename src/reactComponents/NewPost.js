class NewPostSection extends React.Component{
    constructor(props) {
        super(props)
        this.submitNewPost = this.submitNewPost.bind(this)
        this.bodyInput = this.bodyInput.bind(this)
        this.state = {
            bodyInput: "",
        }
    }

    onInput(event, callback) {
        const value = event.target.value
        callback(value)
    }

    bodyInput() {
        this.onInput(event, (input) => {
            this.setState({
                bodyInput: input,
                isSubmitEnabled: input.length > 0 ? true : false
            })
        })
    }

    onSubmit(event, callback) {
        event.preventDefault()
        const XHR = new XMLHttpRequest()
        var formData = new FormData()

        formData.append("body", this.state.bodyInput)

        XHR.addEventListener('load', function(e) {
            const post = document.createElement("div")
            post.setAttribute("id", JSON.parse(XHR.response)._id)
            document.querySelector("#pinnedPostBoard").appendChild(post)
            if (Object.keys(JSON.parse(XHR.response)).includes("_id")) {
                ReactDOM.render(<Post postId={JSON.parse(XHR.response)._id} />, document.getElementById("" + JSON.parse(XHR.response)._id))
                event.target.querySelector("#newPostBody").value = ""
                callback()
            } else {
                alert(JSON.parse(XHR.response).msg)
            }
        });

        XHR.addEventListener('error', function(e) {
            alert( 'Oops! Something went wrong.' );
        } );

        XHR.open('POST', '/posts/newPost');
        XHR.send(formData);
    }

    submitNewPost() {
        this.onSubmit(event, () => {
            this.setState({
                bodyInput : ""
            })
        })
    }

    render() {
        return <div className="container bg-white rounded my-3 p-2">
            <div className="row">
                <div className="col">
                    <form className="form-inline" onSubmit={this.submitNewPost}>
                        <div className="form-group">
                            <textarea className="form-control" placeholder="What's on your mind?" id="newPostBody" onInput={this.bodyInput}></textarea>
                        </div>
                        {this.state.isSubmitEnabled ? 
                            <button type="submit" className="btn btn-primary btn-sm mt-2">Post</button>
                            : <button type="submit" className="btn btn-primary btn-sm mt-2" disabled>Post</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    }
}
