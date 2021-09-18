console.log("landing script loaded")
console.log("correct version")

class LoginRegisterControl extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            registerOrLogin : 0
        }
        this.switch = this.switch.bind(this)
    }

    switch() {
        console.log("switch clicked")
        if (this.state.registerOrLogin === 0) {
            this.setState({
                registerOrLogin: 1
            })
        } else {
            this.setState({
                registerOrLogin: 0
            })
        }

    }

    render() {
        return this.state.registerOrLogin === 0? <Register switchToLogin={this.switch}/> 
        : <Login switchToRegister={this.switch}/>
    }
}

class Register extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            msg : ""
        }
        this.submit = this.submit.bind(this)
    }

    submit(e) {
        e.preventDefault()
        const XHR = new XMLHttpRequest(), FD  = new FormData();

        // Push our data into our FormData object
        e.target.querySelectorAll("input").forEach((input) => {
            FD.append(input.id, input.value)
        })

        // Define what happens on successful data submission
        XHR.addEventListener('load', function(e) {
            document.querySelector("#msg").innerHTML = JSON.parse(XHR.response).msg
        });

        // Define what happens in case of error
        XHR.addEventListener(' error', function(e) {
            alert( 'Oops! Something went wrong.' );
        } );
        // Set up our request
        XHR.open( 'POST', '/auth/register' );
        // Send our FormData object; HTTP headers are set automatically
        XHR.send( FD );
    }

    render() {
        return <form onSubmit={this.submit}>
        <fieldset>
            <legend>Register</legend>
            <label>Username:</label>
            <input id="username" type="text"></input>
            <br></br>
            <label>First Name:</label>
            <input id="firstName" type="text"></input>
            <label>Last Name:</label>
            <input id="lastName" type="text"></input>
            <br></br>
            <label>Email:</label>
            <input id="email" type="text"></input>
            <br></br>
            <label>Password:</label>
            <input id="password" type="password"></input>
            <br></br>
            <label>Confirm Password:</label>
            <input id="confirmPassword" type="password"></input>
            <br></br>
            <button type="submit">Submit</button>
            <br></br>
            <a onClick={this.props.switchToLogin}>Already have an account? Login here.</a>
            <br></br>
            <p id="msg"></p>
        </fieldset>
        </form>
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    submit(e) {
        e.preventDefault()
        const XHR = new XMLHttpRequest(), FD  = new FormData();

        // Push our data into our FormData object
        e.target.querySelectorAll("input").forEach((input) => {
            FD.append(input.id, input.value)
        })

        // Define what happens on successful data submission
        XHR.addEventListener('load', function(e) {
            var msg = `${XHR.status}`
            if (XHR.status === 200) {
                const url = window.location.origin + "/home"
                window.location.replace(url)
            } else if (XHR.status === 401) {
                msg += ": invalid username/password."
            }
            document.querySelector("#msg").innerHTML = msg
        });

        // Define what happens in case of error
        XHR.addEventListener(' error', function(e) {
            alert( 'Oops! Something went wrong.' );
        } );
        // Set up our request
        XHR.open( 'POST', '/auth/login' );
        // Send our FormData object; HTTP headers are set automatically
        XHR.send( FD );
    }

    render() {
        return <form onSubmit={this.submit}>
        <fieldset>
            <legend>Login</legend>
            <label>Username:</label>
            <input id="username" type="text"></input>
            <br></br>
            <label>Password:</label>
            <input id="password" type="password"></input>
            <br></br>
            <button type="submit">Submit</button>
            <br></br>
            <a onClick={this.props.switchToRegister}>Don't have an account yet? Register Here.</a>
            <br></br>
            <p id="msg"></p>
        </fieldset>
        </form>
    }
}
ReactDOM.render(<LoginRegisterControl />, document.querySelector("#loginOrRegister"))