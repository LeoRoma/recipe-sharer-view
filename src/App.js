import React, {Component} from 'react';
import MainPage from '../src/Components/MainPage';
import NavigationBar from '../src/Components/NavigationBar';
import './App.css';

class App extends Component{
  constructor(){
    super()
    this.state={
      recipes: [],
      loggedIn: false,
      userId: localStorage.getItem("userId")
    }
  };

  componentDidMount(){
    this.getRecipes();
    this.getLoginState();
  };

  getRecipes(){
    fetch("https://localhost:44330/Recipes")
    .then(response => response.json())
    .then(recipesJson => this.setState({recipes: recipesJson}))
    .catch(error => error);
  }

  getLoginState = () => {
    console.log(this.state.userId)
    if(this.state.userId !== null){
      this.setState({loggedIn: true})
    }
  
  }

  getLogoutState = () => {
    localStorage.clear();
  }

  render(){
    return(
      <div className="App">
        <NavigationBar 
           loginState={this.state.loggedIn}
           getLogoutState={this.getLogoutState}
        />
        <MainPage 
          recipes={this.state.recipes}
        />
      </div>
    )
  }
}

export default App;
