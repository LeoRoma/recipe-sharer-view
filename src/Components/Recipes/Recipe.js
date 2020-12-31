import React from 'react';
import { Link } from 'react-router-dom';

const Recipe = ({ 
    recipeId, 
    recipeName, 
    description, 
    difficulty, 
    preparationTime, 
    cookingTime, 
    additionalTime, 
    servings, 
    postDate, 
    imageId, 
    imageSuffix, 
    username, 
    userId, 
    getRecipeId}) => {

    var imageDomain = `https://localhost:44330/dynamic/images/${imageId}${imageSuffix}`;
    var recipePagePath = `/${recipeName}`;
   
    var YYYY = postDate.slice(0,4);
    var MM = postDate.slice(5, 7);
    var DD = postDate.slice(8, 10);
    var formattedDate = `${DD}/${MM}/${YYYY}`;

    return (
        <div>
            <img src={imageDomain} style={{ width: "200px", height: "200px" }} alt="food" />
            <Link to={recipePagePath}><h1 onClick={getRecipeId.bind(this, recipeId)}>{recipeName}</h1></Link>
            <h2>{description}</h2>
            <p>Difficulty: {difficulty}</p>
            <p>Preparation Time: {preparationTime}</p>
            <p>Cooking Time: {cookingTime}</p>
            <p>AdditionalTime: {additionalTime}</p>
            <p>Servings: {servings}</p>
            <p>Posted Date: {formattedDate}</p>
            <p>Posted by: {username}</p>
        </div>
    );
}

export default Recipe;

