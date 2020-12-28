import React, {Component} from 'react';
import './App.css';

class App extends Component{
  constructor(){
    super()
    this.state={
      users: []
    }
  };

  componentDidMount(){
    this.getUsers();
  };

  getUsers(){
    fetch("https://localhost:44330/Users")
    .then(response => response.json())
    .then(usersJson => this.setState({users: usersJson}))
  }

  render(){
    console.log(this.state.users)
    return(
      <div className="App">
        <h1>Hello</h1>
      </div>
    )
  }
}

export default App;
