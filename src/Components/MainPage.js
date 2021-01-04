import React, { Component } from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from './Registration/Login';
import NewRecipe from './AddNewRecipe/NewRecipe';
import Register from './Registration/Register';
import Recipes from './Recipes/Recipes';
import RecipeDetails from './Recipes/RecipeDetails';
import UserRecipes from './UserRecipes/UserRecipes';
import UserRecipeDetails from './UserRecipes/UserRecipeDetails';

class MainPage extends Component {
    constructor() {
        super()
        this.state = {
            recipeId: 0,
            username: "",
            imageId: 0,
            imageSuffix: "",
            recipe: {},
        }
    };

    // getRecipeInfo = (recipeId, username, imageId, imageSuffix) =>{
    //     this.setState({
    //         recipeId: recipeId,
    //         username: username,
    //         imageId: imageId,
    //         imageSuffix: imageSuffix
    //     })
    //     this.getRecipe(recipeId);
    // }

    // getRecipe(recipeId){
    //     fetch(`https://localhost:44330/Recipes/${recipeId}`)
    //     .then(response => response.json())
    //     .then(recipeJson => this.setState({recipe: recipeJson}))
    //     .catch(error => error);
    // }

    render() {
        var recipeName = this.props.recipeDetails.recipeName;

        var recipeDetailsPath = `/${recipeName}`;

        return (
            <div className="main-page">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login">
                            <Login userRecipePath={this.props.userRecipePath} />
                        </Route>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/recipes">
                            <Recipes
                                recipes={this.props.recipes}
                                getRecipeId={this.props.getRecipeId}
                            />
                        </Route>
                        <Route exact path={recipeDetailsPath}>
                            <RecipeDetails
                                recipeDetails={this.props.recipeDetails}
                            />
                        </Route>
                        <Route exact path="/user">
                            <UserRecipes
                                getUserRecipeId={this.props.getUserRecipeId}
                                userRecipes={this.props.userRecipes}
                            />
                        </Route>
                        <Route exact path="/user/recipe/details">
                            <UserRecipeDetails 
                                userRecipeDetails={this.props.userRecipeDetails}
                                userRecipeEquipments={this.props.userRecipeEquipments}
                                userRecipeSteps={this.props.userRecipeSteps}
                                userRecipeIngredients={this.props.userRecipeIngredients}
                                userRecipeUser={this.props.userRecipeUser}
                                userRecipeImage={this.props.userRecipeImage}
                                userRecipePostDate={this.props.userRecipePostDate}
                                // userRecipeImageDomain={this.props.userRecipeImageDomain}
                            />
                        </Route>
                        <Route exact path="/new-recipe">
                            <NewRecipe />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default MainPage;