import React, { Component } from 'react';
import MainPage from '../src/Components/MainPage';
import NavigationBar from '../src/Components/NavigationBar';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      recipes: [],
      userRecipes: [],
      loggedIn: false,
      userId: sessionStorage.getItem("userId"),

      recipePageIsOpened: false,
      recipeId: sessionStorage.getItem('recipeId'),
      recipe: {}
    }
  };

  componentDidMount() {
    // this.getUserRecipes();
    this.getRecipes();
    this.getLoginState();
    this.getRecipePageState();
  };

  getRecipes() {
    fetch("https://localhost:44330/Recipes")
      .then(response => response.json())
      .then(recipesJson => this.setState({ recipes: recipesJson }))
      .catch(error => error);
  }

  getUserRecipes = () => {
    let userId = this.state.userId;
    fetch(`https://localhost:44330/Users/${userId}/recipes`)
      .then(response => response.json())
      .then(recipesJson => this.setState({ userRecipes: recipesJson }))
      .catch(error => error);
  }

  getRecipeId = (recipeId) => {
    sessionStorage.setItem('recipeId', recipeId);
  }

  getRecipe() {
    var recipeId = this.state.recipeId;
    fetch(`https://localhost:44330/Recipes/${recipeId}`)
      .then(response => response.json())
      .then(recipeJson => this.setState({ recipe: recipeJson }))
      .catch(error => error);
  }

  getRecipePageState = () => {
    if(this.state.recipeId !== null){
      this.setState({ recipePageIsOpened: true});
      this.getRecipe();
    }
  }

  getLoginState = () => {
    if (this.state.userId !== null) {
      this.setState({ loggedIn: true })
      this.getUserRecipes();
    }
  }

  getLogoutState = () => {
    sessionStorage.clear();
  }

  // window.onbeforeunload = function() {
  //   localStorage.clear();
  // }
  render() {
    var recipeInfo = this.state
    return (
      <div className="App">
        <NavigationBar
          loginState={this.state.loggedIn}
          getLogoutState={this.getLogoutState}
        />
        <MainPage
          recipes={this.state.recipes}
          userRecipes={this.state.userRecipes}
          getRecipeId={this.getRecipeId}
          recipeInfo={recipeInfo}
        />
      </div>
    )
  }
}

export default App;
