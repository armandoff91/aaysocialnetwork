class CommentSection extends React.Component {
    constructor(props) {
        super(props)
        this.commentList = this.commentList.bind(this)
    }

    commentList() {
        return this.props.commentList.map((comment) => <Comment key={comment._id} comment={comment} handleFormSubmit={this.props.handleFormSubmit} postId={this.props.postId}/>)
    }

    render() {
        if (this.props.isCommentToggled) {
            return <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <form className="form-inline" onSubmit={this.props.handleFormSubmit.newComment}>
                                <div className="form-group">
                                    <input className="form-control" placeholder="Your Comment here..."></input>
                                </div>
                                <button type="submit" className="btn">submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                {this.commentList()}
            </div>
        }
        return <div>
        </div>
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isReplyToggled: false,
            isEditToggled: false
        }
        this.replyToggle = this.replyToggle.bind(this)
        this.editToggle = this.editToggle.bind(this)
    }

    editToggle(event) {
        event.preventDefault()
        this.setState({
            isEditToggled: this.state.isEditToggled === false? true : false
        })
    }

    replyToggle() {
        this.setState({
            isReplyToggled: this.state.isReplyToggled === false? true : false 
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.comment.body != prevProps.comment.body)
        this.setState({
            isEditToggled: false
        })
    }

    render() {
        return <div className="container" commentid={this.props.comment._id}>
            <div className="row">
                <div className="col-10 col-sm-11">
                    <UserName userId={this.props.comment.authorId}/>
                    <ContentBody context="comment" postId={this.props.postId} commentId={this.props.comment._id} body={this.props.comment.body} isEditToggled={this.state.isEditToggled} editToggle={this.editToggle} handleEditSubmit={this.props.handleFormSubmit.edit}/>
                    <button type="button" className="btn">like</button>
                    <button type="button" className="btn" onClick={this.replyToggle}>reply</button>
                    <a>{this.props.comment.replies.length}</a>
                </div>
                <div className="col-2 col-sm-1">
                    <Dropdown context="comment" postId={this.props.postId} commentId={this.props.comment._id} editToggle={this.editToggle} handleDeleteSubmit={this.props.handleFormSubmit.delete}/>
                </div>
            </div>
            <ReplySection postId={this.props.postId} commentId={this.props.comment._id} isReplyToggled={this.state.isReplyToggled} replyList={this.props.comment.replies} handleFormSubmit={this.props.handleFormSubmit}/>
        </div>
    }
}