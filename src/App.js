import React, { Component } from 'react';

import Footer from '../src/Components/Footer';
import MainPage from '../src/Components/MainPage';
import NavigationBar from '../src/Components/NavigationBar';
// import Pagination from '../src/Components/Pagination';
import './App.css';
// import UserRecipeDetails from './Components/UserRecipes/UserRecipeDetails';


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
    // this.getUserRecipes();
    this.getRecipes();
    this.getLoginState();
    this.getRecipeDetailsState();
    this.getUserRecipeDetailsState();
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
    this.setState({
      userRecipePageIsOpened: false,
      recipeDetailsPageIsOpened: false
    });
  }

  //Change page

  // paginate = (pageNumber) => {
  //   console.log(pageNumber)
  //   this.setState({currentPage: pageNumber})
  // }

  render() {
    const { recipes, recipe, userRecipes, userRecipe, userRecipeEquipments, userRecipeSteps, userRecipeIngredients, userRecipeUser, userRecipeImage, userRecipePostDate } = this.state;

    const recipesSorted = recipes.sort(function (a, b) { return a.recipeId - b.recipeId});

    const reversedRecipes = recipesSorted.reverse();

    return (
      <div className="app">
      
        <NavigationBar
          loginState={this.state.loggedIn}
          getLogoutState={this.getLogoutState}
        />
        <MainPage
          getRecipes={this.getRecipes}
          getRecipeId={this.getRecipeId}
          getUserRecipeId={this.getUserRecipeId}
          recipes={reversedRecipes}
          userRecipes={userRecipes}
          recipeDetails={recipe}
          userRecipeDetails={userRecipe}
          userRecipeEquipments={userRecipeEquipments}
          userRecipeSteps={userRecipeSteps}
          userRecipeIngredients={userRecipeIngredients}
          userRecipeUser={userRecipeUser}
          // userRecipeImageDomain={userRecipeImageDomain}
          userRecipeImage={userRecipeImage}
          userRecipePostDate={userRecipePostDate}
        />
         <Footer />
      </div>
    )
  }
}

export default App;
