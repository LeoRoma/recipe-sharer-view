import React from 'react';
import Recipe from './Recipe';

const Recipes = ({recipes}) => {

    return(
        <div className="recipes">
            {recipes.map((recipe) =>
                <Recipe 
                    recipeId={recipe.recipeId}
                    recipeName={recipe.recipeName}
                    description={recipe.description}
                    difficulty={recipe.difficulty}
                    preparationTime={recipe.preparationTime}
                    cookingTime={recipe.cookingTime}
                    additionalTime={recipe.additionalTime}
                    servings={recipe.servings}
                    postDate={recipe.postDate}
                    image={recipe.image.id}
                    username={recipe.user.username}
                    userId={recipe.userId}
                />
            )}
            
        </div>
    )
}

export default Recipes;