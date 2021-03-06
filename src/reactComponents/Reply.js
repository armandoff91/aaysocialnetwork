class ReplySection extends React.Component {
    constructor(props) {
        super(props)
        this.replyList = this.replyList.bind(this)
    }

    replyList() {
        return this.props.replyList.map((reply) => <Reply key={reply._id} reply={reply} postId={this.props.postId} commentId={this.props.commentId} replyId={reply._id} handleFormSubmit={this.props.handleFormSubmit}/>)
    }

    render() {
        if (this.props.isReplyToggled) {
            return <div>
                {this.replyList()}
                <form className="form-inline" onSubmit={this.props.handleFormSubmit.newReply} commentId={this.props.commentId}>
                    <div className="form-group-sm">
                        <div className="input-group">
                            <input className="form-control" placeholder="Your Reply here..."></input>
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-outline-primary">submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        }
        return <div></div>
    }
}

class Reply extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditToggled: false
        }
        this.editToggle = this.editToggle.bind(this)
    }

    editToggle(event) {
        event.preventDefault()
        this.setState({
            isEditToggled: this.state.isEditToggled === false? true : false
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.reply.body != prevProps.reply.body)
        this.setState({
            isEditToggled: false
        })
    }

    render() {
        return <div className="row" commentId={this.props.commentId} replyId={this.props.replyId}>
            <div className="col-10 col-sm-11">
                <UserName userId={this.props.reply.authorId}/>
                <ContentBody context="reply" postId={this.props.postId} commentId={this.props.commentId} replyId={this.props.replyId} body={this.props.reply.body} isEditToggled={this.state.isEditToggled} editToggle={this.editToggle} handleEditSubmit={this.props.handleFormSubmit.edit}/>
            </div>
            <div className="col-2 col-sm-1">
                <Dropdown context="reply" postId={this.props.postId} commentId={this.props.commentId} replyId={this.props.replyId} editToggle={this.editToggle} handleDeleteSubmit={this.props.handleFormSubmit.delete}/>
            </div>
        </div>
    }
}