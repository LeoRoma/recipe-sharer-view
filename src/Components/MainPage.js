import React, {Component} from 'react';

import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Login from './Registration/Login';
import Register from './Registration/Register';
import Recipes from './Recipes/Recipes';
import RecipePage from './Recipes/RecipePage';
import UserRecipes from './UserRecipes/UserRecipes';

class MainPage extends Component{
    constructor(){
        super()
        this.state={
            recipeId: 0,
            username: "",
            imageId: 0,
            imageSuffix: "",
            recipe: {}
        }
    };

    getRecipeInfo = (recipeId, username, imageId, imageSuffix) =>{
        this.setState({
            recipeId: recipeId,
            username: username,
            imageId: imageId,
            imageSuffix: imageSuffix
        })
        this.getRecipe(recipeId);
    }

    getRecipe(recipeId){
        fetch(`https://localhost:44330/Recipes/${recipeId}`)
        .then(response => response.json())
        .then(recipeJson => this.setState({recipe: recipeJson}))
        .catch(error => error);
    }

    render(){
        var recipeName = this.state.recipe.recipeName
        var recipePagePath = `/${recipeName}`
        return(
            <div className="main-page">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/recipes">
                            <Recipes 
                                recipes={this.props.recipes}
                                getRecipeInfo={this.getRecipeInfo}
                            />
                        </Route> 
                        <Route exact path={recipePagePath}>
                            <RecipePage 
                                recipeInfo={this.state}
                            />
                        </Route>
                        <Route exact path="/user">
                            <UserRecipes 
                               userRecipes={this.props.userRecipes}
                            />
                        </Route>
                    </Switch>
                </BrowserRouter>              
            </div>
        )
    }
}

export default MainPage;