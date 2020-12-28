import React from 'react';

const Recipe = ({recipeId, recipeName, description, difficulty, preparationTime, cookingTime, additionalTime, servings, postDate, userId}) => {

    return(
        <div>
            <h1>{recipeName}</h1>
            <h2>{description}</h2>
            <p>{difficulty}</p>
            <p>{preparationTime}</p>
            <p>{cookingTime}</p>
            <p>{additionalTime}</p>
            <p>{servings}</p>
            <p>{postDate}</p>
        </div>
    )
}

export default Recipe;
