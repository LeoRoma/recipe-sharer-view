import React, { Component } from 'react';
import './Login.css';
import { Redirect, Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            invalidLogin: false,
            redirect: false
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();

        let { email, password } = this.state
        fetch("https://localhost:44330/Login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                sessionStorage.setItem("userId", response.userDetails.userId);
                sessionStorage.setItem("username", response.userDetails.username);
                sessionStorage.setItem("token", response.token);
                this.setRedirect();             
            })
            .catch(error => {
                console.error("There was an error!", error)
                this.setState({invalidLogin: true})
            })
        setTimeout(function () {
            window.location.reload(false);
        }, 500)
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/user" />
        }
    };

    render() {
        return (
            <div className="login-container">
                {this.renderRedirect()}
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <div className="login-header">
                        <h1>Sign In to Recipe Sharer</h1>
                        {this.state.invalidLogin?<p style={{color:"red"}}>Your username or password may be incorrect. Sign up for an account</p>: null}
                        {this.props.isRegistered? <h6>Your account has been successfully created, please log in to enter in your space.</h6> : null}
                    </div>
                    <div>
                        <label>
                            Email Address:
                            <br />
                            <input type="email" name="email" onChange={this.handleChangeEmail} />
                        </label>
                    </div>

                    <div>
                        <label>
                            Password:
                            <br />
                            <input type="password" name="password" onChange={this.handleChangePassword} />
                        </label>
                    </div>


                    <input className="btn-primary signin-button" type="submit" value="SIGN IN" />

                    <div className="not-account">
                        <p>Don't have an account? <Link to="/register">Sign Up</Link> </p>
                    </div>
                </form>
            </div>
        )
    };
}

export default Login