import React, {Component} from 'react';

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: ''
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        let {email, password} = this.state
        fetch("https://localhost:44330/api/Login", {
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
        // .then(response => {
            
        //     // sessionStorage.setItem("userId", response.userId)
            sessionStorage.setItem("token", response.token)
        })
        .catch(error => {
            console.error("There was an error!", error)
        })
        .then(form.reset())
        // setTimeout(function () {
        //     window.location.reload(false);
        //   }, 500)
    }

    render(){
        // console.log(sessionStorage.getItem('userId'))
        console.log(sessionStorage.getItem('token'))
        return(
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
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

export default Login