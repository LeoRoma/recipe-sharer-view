import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            redirect: false
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
            localStorage.setItem("userId", response.userDetails.userId);
            localStorage.setItem("token", response.token);           
            this.setRedirect();
            console.log('Login Successfull!')
        })
        .catch(error => {
            console.error("There was an error!", error)
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
          return <Redirect to='/user' />
        }
      };

    render(){
        // console.log(sessionStorage.getItem('userId'))
        // console.log(sessionStorage.getItem('token'))
        return(
            <div>
                {this.renderRedirect()}
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