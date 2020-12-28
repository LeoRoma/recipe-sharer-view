import React from 'react';

const Recipe = ({recipeName, description, difficulty, preparationTime, cookingTime, additionalTime, servings, postDate, image, username, userId}) => {

var imageDomain = `https://localhost:44330/dynamic/images/${image}.jpg`;

    return(
        <div>
            <img src={imageDomain} alt="food"/>
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

