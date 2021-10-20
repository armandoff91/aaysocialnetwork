class Dropdown extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="dropdown">
            <a className="btn btn-outline-secondary btn-sm dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><a className="dropdown-item" onClick={this.props.editToggle}>Edit</a></li>
                <li><a className="dropdown-item" onClick={this.props.handleDeleteSubmit} context={this.props.context} postid={this.props.postId} commentid={this.props.commentId} replyid={this.props.replyId}>Delete</a></li>
            </ul>
        </div>
    }
}