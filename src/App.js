import React, { Component } from 'react';
import MainPage from '../src/Components/MainPage';
import NavigationBar from '../src/Components/NavigationBar';
import './App.css';
import _ from 'lodash';

class App extends Component {
  constructor() {
    super()
    this.state = {
      recipes: [],
      userRecipes: [],
      loggedIn: false,
      userId: sessionStorage.getItem("userId"),

      recipeDetailsPageIsOpened: false,
      userRecipeDetailsPageIsOpened: false,
      recipeId: sessionStorage.getItem('recipeId'),
      userRecipeId: sessionStorage.getItem('userRecipeId'),
      recipe: {},
      userRecipe: {}
    }
  };

  componentDidMount() {
    // this.getUserRecipes();
    this.getRecipes();
    this.getLoginState();
    this.getRecipeDetailsState();
    this.getUserRecipeDetailsState();
  };

  // Recipes
  getRecipes() {
    fetch("https://localhost:44330/Recipes")
      .then(response => response.json())
      .then(recipesJson => this.setState({ recipes: recipesJson }))
      .catch(error => error);
  }

  // Users/id/recipes
  getUserRecipes = () => {
    let userId = this.state.userId;
    fetch(`https://localhost:44330/Users/${userId}/recipes`)
      .then(response => response.json())
      .then(recipesJson => this.setState({ userRecipes: recipesJson }))
      .catch(error => error);
  }

  // Recipes/id
  getRecipeDetails() {
    var recipeId = this.state.recipeId;
    fetch(`https://localhost:44330/Recipes/${recipeId}`)
      .then(response => response.json())
      .then(recipeJson => this.setState({ recipe: recipeJson }))
      .catch(error => error);
  }

  getRecipeId = (recipeId) => {
    setTimeout(function () {
      window.location.reload(false);
      sessionStorage.setItem('recipeId', recipeId);
    }, 100)
  }

  getRecipeDetailsState = () => {
    if (this.state.recipeId !== null) {
      this.setState({ recipeDetailsPageIsOpened: true });
      this.getRecipeDetails();
    }
  }

  // /Users/1/recipes/1
  getUserRecipeDetails() {
    var userRecipeId = this.state.userRecipeId;
    var userId = this.state.userId;
    fetch(`https://localhost:44330/Users/${userId}/recipe/${userRecipeId}`)
      .then(response => response.json())
      .then(recipeJson => this.setState({ userRecipe: recipeJson }))
      .catch(error => error);
  }

  getUserRecipeId = (recipeId) => {
    setTimeout(function () {
      window.location.reload(false);
      sessionStorage.setItem('userRecipeId', recipeId);
    }, 500)
  }

  getUserRecipeDetailsState = () => {
    if (this.state.userRecipeId !== null) {
      this.setState({ userRecipePageIsOpened: true });
      this.getUserRecipeDetails();
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
    var recipeDetails = this.state.recipe;
    var userRecipeDetails = this.state.userRecipe;

    return (
      <div className="App">
        <NavigationBar
          loginState={this.state.loggedIn}
          getLogoutState={this.getLogoutState}
        />
        <MainPage
          getRecipeId={this.getRecipeId}
          getUserRecipeId={this.getUserRecipeId}
          recipes={this.state.recipes}
          userRecipes={this.state.userRecipes}
          recipeDetails={recipeDetails}
          userRecipeDetails={userRecipeDetails}
        />
      </div>
    )
  }
}

export default App;
