import React, {Component} from 'react';
import MainPage from '../src/Components/MainPage';
import NavigationBar from '../src/Components/NavigationBar';
import './App.css';

class App extends Component{
  constructor(){
    super()
    this.state={
      recipes: [],
      userRecipes: [],
      loggedIn: false,
      userId: sessionStorage.getItem("userId"), 
    }
  };

  componentDidMount(){
    // this.getUserRecipes();
    this.getRecipes();
    this.getLoginState();

  };

  getRecipes(){
    fetch("https://localhost:44330/Recipes")
    .then(response => response.json())
    .then(recipesJson => this.setState({recipes: recipesJson}))
    .catch(error => error);
  }

  getUserRecipes = () => {
    let userId = this.state.userId;
    fetch(`https://localhost:44330/Users/${userId}/recipes`)
    .then(response => response.json())
    .then(recipesJson => this.setState({userRecipes: recipesJson}))
    .catch(error => error);
  }

  getLoginState = () => {
    if(this.state.userId !== null){
      this.setState({loggedIn: true})
      this.getUserRecipes();
    }
  }

  getLogoutState = () => {
    sessionStorage.clear();
  }

    // window.onbeforeunload = function() {
    //   localStorage.clear();
    // }
  render(){

    return(
      <div className="App">
        <NavigationBar 
           loginState={this.state.loggedIn}
           getLogoutState={this.getLogoutState}
        />
        <MainPage 
          recipes={this.state.recipes}
          userRecipes={this.state.userRecipes}
        />
      </div>
    )
  }
}

export default App;
