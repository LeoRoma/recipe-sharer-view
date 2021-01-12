import React, { Component } from 'react';
// import {Form, Button} from 'react-bootstrap';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',

            errors: {
                username: '',
                email: '',
                password: ''
            }
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();

        let { username, email, password } = this.state
        fetch("https://localhost:44330/Users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                role: "user"
            })
        })
            .then(response => response.json())
            .catch(error => {
                console.error("There was an error!", error)
            })
        // setTimeout(function () {
        //     window.location.reload(false);
        //   }, 500)
    }


    render() {
        return (
            <div className="register-container">
                <h1>Welcome to Recipe Sharer!</h1>
                <form className="register-form" onSubmit={this.handleSubmit}>
                    
                    <div>
                        <label style={{color:"white"}}>
                            Username:
                            <br />
                        <input type="text" name="username" onChange={this.handleChangeUsername}  />
                        </label>
                    </div>

                    <div>
                        <label style={{color:"white"}}>
                            Email:
                            <br />
                        <input type="text" name="email" onChange={this.handleChangeEmail} />
                        </label>
                    </div>

                    <div>
                        <label style={{color:"white"}}>
                            Password:
                            <br />
                        <input type="password" name="password" onChange={this.handleChangePassword} />
                        </label>
                    </div>

                    <input className="btn-primary signin-button" type="submit" value="Sign Up" />
                </form>
            </div>
        )
    };
}

export default Register;