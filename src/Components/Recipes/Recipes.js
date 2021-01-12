import React from 'react';
import Recipe from './Recipe';

const Recipes = ({ recipes, getRecipeId }) => {

    var recipesSorted = recipes.sort(function (a, b) { return b['postDate'] - a['postDate'] });
    var reversedRecipes = recipesSorted.reverse();
    console.log(recipesSorted)

    return (
        <div className="recipe-container" >
            <h1>Recipes</h1>
            {
                reversedRecipes.map((recipe) =>
                    <
                        Recipe key={recipe.recipeId}
                        recipeId={recipe.recipeId}
                        recipeName={recipe.recipeName}
                        description={recipe.description}
                        difficulty={recipe.difficulty}
                        preparationTime={recipe.preparationTime}
                        cookingTime={recipe.cookingTime}
                        additionalTime={recipe.additionalTime}
                        servings={recipe.servings}
                        postDate={recipe.postDate}
                        imageId={recipe.image.id}
                        imageSuffix={recipe.image.suffix}
                        username={recipe.user.username}
                        userId={recipe.userId}
                        getRecipeId={getRecipeId}
                    />
                )
            }
        </div>
    )
}

export default Recipes;