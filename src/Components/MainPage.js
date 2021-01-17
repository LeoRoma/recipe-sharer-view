import React, { Component } from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

// import EditRecipe from './UserRecipes/RecipeEdit/EditRecipe';
// import Footer from './Footer';
import Login from './Registration/Login';
import NewRecipe from './AddNewRecipe/NewRecipe';
import Pagination from './Pagination';
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

            // pagination
            currentPage: 1,
            recipesPerPage: 5,
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

    paginate = (pageNumber) => {
        console.log(pageNumber)
        this.setState({ currentPage: pageNumber })
    }

    render() {
        const {currentPage, recipesPerPage} = this.state;
        const indexOfLastRecipe = currentPage * recipesPerPage;
        const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
        const currentRecipes = this.props.recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

        const recipeName = this.props.recipeDetails.recipeName;
        const recipeDetailsPath = `/${recipeName}`;

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
                                recipes={currentRecipes}
                                getRecipeId={this.props.getRecipeId}
                            />
                            <Pagination
                                recipesPerPage={recipesPerPage}
                                totalRecipes={this.props.recipes.length}
                                paginate={this.paginate}
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

                                userRecipeImage={this.props.userRecipeImage}

                            // userRecipeImageDomain={this.props.userRecipeImageDomain}
                            />
                        </Route>
                        <Route exact path="/new-recipe">
                            <NewRecipe
                                getUserRecipeId={this.props.getUserRecipeId}
                                getRecipes={this.props.getRecipes}
                            />
                        </Route>
                        {/* <Route exact path="/edit-recipe">
                            <EditRecipe />
                        </Route> */}
                    </Switch>
                </BrowserRouter>
               
            </div>
        )
    }
}

export default MainPage;