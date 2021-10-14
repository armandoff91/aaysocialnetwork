class Dropdown extends React.Component {
    constructor(props) {
        super(props)
        this.handleUpdateOnClick = this.handleUpdateOnClick.bind(this)
        this.handleDeleteOnClick = this.handleDeleteOnClick.bind(this)
    }

    postRequest(url, data, callback) {
        const XHR = new XMLHttpRequest()
        var formData = new FormData()

        for (key in data) {
            formData.append(key, data[key])
        }

        XHR.addEventListener('load', function(e) {
            callback(JSON.parse(XHR.response))
        });

        XHR.addEventListener('error', function(e) {
            alert( 'Oops! Something went wrong.' );
        } );

        XHR.open('POST', '/posts/' + url);
        XHR.send(formData);
    }

    handleUpdateOnClick() {
        console.log("handleUpdate")
        ReactDOM.render(<EditSection postRequest={this.postRequest} />, document.querySelector("#editSection"))
    }


    handleDeleteOnClick() {

    }

    render() {
        return <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                
            </a>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><p>postId:{this.props.postId}, commentId:{this.props.commentId}, replyId:{this.props.replyId}</p></li>
                <li><a className="dropdown-item" onClick={this.props.editToggle}>Edit</a></li>
                <li><a className="dropdown-item">Delete</a></li>
            </ul>
        </div>
    }
}