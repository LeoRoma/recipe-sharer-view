import React from 'react';
import { Link } from 'react-router-dom';
import UserRecipe from './UserRecipe';


const UserRecipes = ({ userRecipes, getUserRecipeId }) => {

    var nRecipes = userRecipes.length;
    var username = sessionStorage.getItem("username");
    return (
        <div>
            <h1>Hello {username}!</h1>
            <h1>You have posted {nRecipes} recipes </h1>
            <Link to="/new-recipe"><button className="btn-outline-primary">Add New Recipe</button></Link>
            {userRecipes.map((userRecipe) =>
                <UserRecipe
                    key={userRecipe.recipeId}
                    recipeId={userRecipe.recipeId}
                    recipeName={userRecipe.recipeName}
                    description={userRecipe.description}
                    difficulty={userRecipe.difficulty}
                    preparationTime={userRecipe.preparationTime}
                    cookingTime={userRecipe.cookingTime}
                    additionalTime={userRecipe.additionalTime}
                    servings={userRecipe.servings}
                    postDate={userRecipe.postDate}
                    imageId={userRecipe.image.id}
                    imageSuffix={userRecipe.image.suffix}
                    username={userRecipe.user.username}
                    // userId={userRecipe.userId}
                    getUserRecipeId={getUserRecipeId}
                />
            )}
        </div>
    );
}





export default UserRecipes;