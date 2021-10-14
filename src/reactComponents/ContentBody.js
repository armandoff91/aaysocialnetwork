class ContentBody extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body : this.props.body
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.body != prevProps.body) {
            this.setState({
                body: this.props.body
            })
        }
    }

    render() {
        if (this.props.isEditToggled) {
            return <form context={this.props.context} postid={this.props.postId} commentid={this.props.commentId} replyid={this.props.replyId} className="form-inline" onSubmit={this.props.handleEditSubmit}>
                <input type="text" className="form-control" id="" value={this.state.body} onChange={(e) => {this.setState({body: e.target.value })}} autofocus="true" ></input>
                <a type="" onClick={this.props.editToggle} className="btn btn-primary mb-2">Cancel</a>
                <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </form> 
        }
        return <p>{this.state.body}</p>
    }
}