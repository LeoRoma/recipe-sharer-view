import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
// import {Form, Button} from 'react-bootstrap';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            emailAlreadyExists:false,
            errors: {
                username: '',
                email: '',
                password: ''
            },
            redirect: false
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
                userRole: "user"
            })
        })
            .then(response => response.json())
            .then(response => {
                if(response.status === 200){
                    this.setRedirect();
                    this.props.setRegisterState();
                    alert("success");
                }else if(response.status === 400){
                    this.setState({emailAlreadyExists:true});
                }   
                //if badrequest{alert email span}
                //else if request status ok => redirect
                
                console.log(response);
                // this.setRedirect();
            })
            .catch(error => {
                console.error("There was an error!", error)
                alert("Email already exists!")
            })
        // setTimeout(function () {
        //     window.location.reload(false);
        //   }, 500)
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
        return (
            <div className="register-container">
                {this.renderRedirect()}
                <h1>Welcome to Recipe Sharer!</h1>
                <form className="register-form" onSubmit={this.handleSubmit}>
                    
                    <div>
                        {this.state.emailAlreadyExists? <h3 style={{color:"red"}}>Email already in use!</h3> : null}
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
                        <input type="email" name="email" onChange={this.handleChangeEmail} />
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