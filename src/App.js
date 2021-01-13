import React, { Component } from 'react';

// import Footer from '../src/Components/Footer';
import MainPage from '../src/Components/MainPage';
import NavigationBar from '../src/Components/NavigationBar';
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
      userRecipeImage: {}
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
    // .catch(error => error);
    //   setTimeout(function () {
    //     window.location.reload(false);
    // }, 500)
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

  // window.onbeforeunload = function() {
  //   localStorage.clear();
  // }
  render() {
    // var recipeDetails = this.state.recipe;
    // var userRecipeDetails = this.state.userRecipe;
    // var userRecipeEquipments = this.state.userRecipeEquipments;
    // var userRecipeSteps = this.state.userRecipeSteps;
    // var userRecipeIngredients = this.state.userRecipeIngredients;
    // var userRecipeUser = this.state.userRecipeUser;
    // var userRecipeImage = this.state.userRecipeImage;
    // var userRecipePostDate = this.state.userRecipePostDate;

    const {recipes, recipe, userRecipes, userRecipe, userRecipeEquipments, userRecipeSteps, userRecipeIngredients, userRecipeUser, userRecipeImage, userRecipePostDate} = this.state
    // console.log(userRecipeImage.id);
    // var imageId = userRecipeImage.id;

    // var imageSuffix = userRecipeImage.suffix;
    // var userRecipeImageDomain = `https://localhost:44330/dynamic/images/${imageId}${imageSuffix}`;
  
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
          recipes={recipes}
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
       
      </div>
    )
  }
}

export default App;
