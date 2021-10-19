class UserName extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username : null
        }
        this.getUserName = this.getUserName.bind(this)
        this.mountUsername = this.mountUsername.bind(this)
    }

    getUserName(callback) {
        const XHR = new XMLHttpRequest()

        XHR.addEventListener('load', function(e) {
            callback(JSON.parse(XHR.response))
        });

        XHR.open('GET', '/user?userId=' + this.props.userId);
        XHR.send(null);
    }

    mountUsername() {
        if (userList[this.props.userId] !== undefined) {
            this.setState({
                username: userList[this.props.userId]
            })
        } else {
            this.getUserName((response) => {
                userList[this.props.userId] = (response.firstName + " " + response.lastName) != "undefined undefined" ? 
                    response.firstName + " " + response.lastName : this.props.userId  
                this.setState({
                    username: userList[this.props.userId]
                })
            })
        }
    }
    
    componentDidUpdate(prevProps) {
        if ((this.props.userId !== prevProps.userId) && (this.props.userId !== null)) {
            this.mountUsername()
        }
    }

    componentDidMount() {
        if (this.props.userId !== null) {
            this.mountUsername()
        }
    }

    render() {
        return <div className="strong">{this.state.username}</div>
    }
}

console.log("react USerName loaded")