import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import {Form, Button} from 'react-bootstrap';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            emailAlreadyExists: false,
            passwordNotMatched: false,
            errors: {
                username: '',
                email: '',
                password: ''
            },
            redirect: false
        };

        // this.handleChangeUsername = this.handleChangeUsername.bind(this);
        // this.handleChangeEmail = this.handleChangeEmail.bind(this);
        // this.handleChangePassword = this.handleChangePassword.bind(this);
        // this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        // if (this.state.password !== this.state.confirmPassword) {
        //     this.setState({ passwordNotMatched: !this.state.passwordNotMatched});
        // }
    }


    handleSubmit = (event) => {
        event.preventDefault();

        let { username, email, password, confirmPassword } = this.state
  

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
                    userRole: "user"
                })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === 400) {
                        this.setState({ emailAlreadyExists: true });
                    } else {

                        this.setRedirect();
                        this.props.setRegisterState();
                        alert("success");
                    }
                    //if badrequest{alert email span}
                    //else if request status ok => redirect

                    console.log(response);
                    // this.setRedirect();
                })
                .catch(error => {
                    console.error("There was an error!", error)
                    // alert("Email already exists!")
                })
            // setTimeout(function () {
            //     window.location.reload(false);
            //   }, 500)
        // }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/login" />
        }
    };

    errorMessage = () => {
        return "Email already in use!"
    }

    render() {
        const { emailAlreadyExists, passwordNotMatched } = this.state;

        return (
            <div className="register-container">
                {this.renderRedirect()}
                <div className="login-header">
                    <h1>Welcome to Recipe Sharer!</h1>

                </div>
                <form className="register-form" onSubmit={this.handleSubmit}>

                    <div>
                        {emailAlreadyExists ? <p style={{ color: "red", textAlign: "center" }}>Email already in use!</p> : null}
                        <label>
                            Username:
                            <br />
                            <input type="text" name="username" onChange={this.handleChange} required />
                        </label>
                    </div>

                    <div>
                        <label>
                            Email:
                            <br />
                            <input type="email" name="email" onChange={this.handleChange} required />
                        </label>
                    </div>

                    <div>
                        <label>
                            Password:
                            <br />
                            <input type="password" name="password" onChange={this.handleChange} required />
                        </label>
                    </div>
                    <div>
                        <label>
                            Confirm Password:
                            <br />
                            <input type="password" name="reEnterPassword" onChange={this.handleChange} />
                            {passwordNotMatched? <p style={{ color: "red", textAlign: "center" }}>Passwords don't match</p> : null}
                        </label>
                    </div>
                    <input className="btn-primary signin-button" type="submit" value="Sign Up" />
                </form>
            </div>
        )
    };
}

export default Register;