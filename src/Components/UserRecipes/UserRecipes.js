import React, {Component} from 'react';
import UserRecipe from './UserRecipe';

const UserRecipes = ({userRecipes}) => {

    var nRecipes = userRecipes.length;

    return(
        <div>
            <h1>You have posted {nRecipes} recipes </h1>
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
                    userId={userRecipe.userId}
                />
            )}
        </div>
    );
}


       


export default UserRecipes;