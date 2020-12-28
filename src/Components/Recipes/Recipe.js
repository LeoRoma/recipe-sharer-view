import React from 'react';

const Recipe = ({recipeId, recipeName, description, difficulty, preparationTime, cookingTime, additionalTime, servings, postDate, image, username, userId}) => {
console.log(image)
var imageDomain = `https://localhost:44330/dynamic/images/${image}.jpg`;
console.log(imageDomain)
    return(
        <div>
            <img src={imageDomain} />
            <h1>{recipeName}</h1>
            <h2>{description}</h2>
            <p>Difficulty: {difficulty}</p>
            <p>Preparation Time: {preparationTime}</p>
            <p>Cooking Time: {cookingTime}</p>
            <p>AdditionalTime: {additionalTime}</p>
            <p>Servings: {servings}</p>
            <p>Posted Date: {postDate}</p>
            <p>Posted by: {username}</p>
        </div>
    )
}

export default Recipe;


// d51594da-3a2d-4acc-c35a-08d8a7bc1bca

// /dynamic/images/