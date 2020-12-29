import React, {Component} from 'react';
// import {Form, Button} from 'react-bootstrap';

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            email: '',
            password: ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event){
        this.setState({username: event.target.value});
    }

    handleChangeEmail(event){
        this.setState({email: event.target.value});
    }

    handleChangePassword(event){
        this.setState({password: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = document.querySelector("form");

        let {username, email, password} = this.state
        fetch("https://localhost:44330/Users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .catch(error => {
            console.error("There was an error!", error)
        })
        .then(form.reset());
        // setTimeout(function () {
        //     window.location.reload(false);
        //   }, 500)
    }

    render(){
        return(
            <div id="register">
                <form className="form" onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" onChange={this.handleChangeUsername}/>
                    </label>
                    <label>
                        Email:
                        <input type="text" name="email" onChange={this.handleChangeEmail} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" onChange={this.handleChangePassword} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    };
}

export default Register;