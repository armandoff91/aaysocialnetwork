class EditSection extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col">
                    <form>
                        <label for="">Edit {this.props.context}</label>
                        <input className="form-control" id="" placeholder="Enter email"></input>
                    </form>
                </div>
            </div>
        </div>
    }
}