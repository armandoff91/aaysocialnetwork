class NewPostSection extends React.Component{
    constructor(props) {
        super(props)
        this.submitNewPost = this.submitNewPost.bind(this)
    }

    submitNewPost(event) {
        event.preventDefault()
        const XHR = new XMLHttpRequest()
        var formData = new FormData()

        formData.append("title", event.target.querySelector("#newPostTitle").value)
        formData.append("body", event.target.querySelector("#newPostBody").value)

        XHR.addEventListener('load', function(e) {
            const post = document.createElement("div")
            post.setAttribute("id", JSON.parse(XHR.response)._id)
            document.querySelector("#pinnedPostBoard").appendChild(post)
            ReactDOM.render(<Post postId={JSON.parse(XHR.response)._id} />, document.getElementById("" + JSON.parse(XHR.response)._id))
        });

        XHR.addEventListener('error', function(e) {
            alert( 'Oops! Something went wrong.' );
        } );

        XHR.open('POST', '/posts/newPost');
        XHR.send(formData);
    }

    render() {
        return <div className="container bg-white rounded">
            <div className="row">
                <div className="col">
                    <h6>New Post</h6>
                    <form className="form-inline" onSubmit={this.submitNewPost}>
                        <div className="form-group">
                            <input className="form-control" placeholder="Title" id="newPostTitle"></input>
                            <input className="form-control" placeholder="What's on your mind?" id="newPostBody"></input>
                        </div>
                        <button type="submit" className="btn">submit</button>
                    </form>
                </div>
            </div>
        </div>
    }
}
