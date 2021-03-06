import React, { Component } from 'react';

import Footer from '../src/Components/Footer';
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
      isRegistered: false,
      userId: sessionStorage.getItem("userId"),

      recipeDetailsPageIsOpened: false,
      userRecipeDetailsPageIsOpened: false,
      recipeId: sessionStorage.getItem('recipeId'),
      userRecipeId: sessionStorage.getItem('userRecipeId'),
      recipe: {},

      userRecipe: {},
      userRecipePostDate: '',
      userRecipeEquipments: [],
      userRecipeSteps: [],
      userRecipeIngredients: [],
      userRecipeUser: {},
      userRecipeImage: {},

    }
  };

  componentDidMount() {
    this.getRecipes();
    this.setLoginState();
    this.getRecipeDetailsState();
    this.setUserRecipeDetailsState();
  };

  // Recipes
  getRecipes = () => {
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
    }, 1000)
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
      .then(recipeJson => {
        this.setState({
          userRecipe: recipeJson,
          userRecipeEquipments: recipeJson.equipments,
          userRecipeSteps: recipeJson.steps,
          userRecipeIngredients: recipeJson.ingredients,
          userRecipeUser: recipeJson.user,
          userRecipeImage: recipeJson.image,
          userRecipePostDate: recipeJson.postDate
        })
      })
  }

  getUserRecipeId = (recipeId) => {
    setTimeout(function () {
      window.location.reload(false);
      sessionStorage.setItem('userRecipeId', recipeId);
    }, 10)
  }

  setUserRecipeDetailsState = () => {
    if (this.state.userRecipeId !== null) {
      this.setState({ userRecipePageIsOpened: true });
      this.getUserRecipeDetails();
    }
  }

  // Register/login
  setRegisterState = () => {
    console.log("Register state successfull")
    this.setState({isRegistered: true});
  }

  setLoginState = () => {
    if (this.state.userId !== null) {
      this.setState({ loggedIn: true })
      this.getUserRecipes();
    }
  }

  setLogoutState = () => {
    sessionStorage.clear();
    this.setState({
      userRecipePageIsOpened: false,
      recipeDetailsPageIsOpened: false
    });
  }

  render() {
    const { recipes, recipe, userRecipes, userRecipe, userRecipeEquipments, userRecipeSteps, userRecipeIngredients, userRecipeUser, userRecipeImage, userRecipePostDate, isRegistered } = this.state;

    const recipesSorted = recipes.sort(function (a, b) { return a.recipeId - b.recipeId});

    const reversedRecipes = recipesSorted.reverse();

    return (
      <div className="app">
      
        <NavigationBar
          loginState={this.state.loggedIn}
          setLogoutState={this.setLogoutState}
        />
        <MainPage
          getRecipes={this.getRecipes}
          getRecipeId={this.getRecipeId}
          getUserRecipeId={this.getUserRecipeId}
          isRegistered={isRegistered}
          recipes={reversedRecipes}
          userRecipes={userRecipes}
          recipeDetails={recipe}
          setRegisterState={this.setRegisterState}
          userRecipeDetails={userRecipe}
          userRecipeEquipments={userRecipeEquipments}
          userRecipeSteps={userRecipeSteps}
          userRecipeIngredients={userRecipeIngredients}
          userRecipeUser={userRecipeUser}
          userRecipeImage={userRecipeImage}
          userRecipePostDate={userRecipePostDate}
        />
         <Footer />
      </div>
    )
  }
}

export default App;
