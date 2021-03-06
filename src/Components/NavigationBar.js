import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';

class NavigationBar extends Component{

    render(){
        return(
            <div>
                <Navbar collapseOnSelect expand="lg" variant="dark">
                <Navbar.Brand href="/recipes">Recipe Sharer</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav>
                        {this.props.loginState? <Nav.Link href="/user">Your Recipes</Nav.Link> : null}
                        {this.props.loginState? <Nav.Link href="/login" onClick={this.props.setLogoutState}>Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
                        {this.props.loginState? null : <Nav.Link href="/register">Register</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar;