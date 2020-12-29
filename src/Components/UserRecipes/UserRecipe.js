import React from 'react';
import {Link} from 'react-router-dom';

const UserRecipe = ({recipeId, recipeName, description, difficulty, preparationTime, cookingTime, additionalTime, servings, postDate, imageId, imageSuffix, username, userId}) => {

    var imageDomain = `https://localhost:44330/dynamic/images/${imageId}${imageSuffix}`;
    var recipePagePath = `/${recipeName}`

    return(
        <div>
            <img src={imageDomain} style={{width:"200px", height:"200px"}} alt="food"/>
            <Link to={recipePagePath}><h1>{recipeName}</h1></Link>
            <h2>{description}</h2>
            <p>Difficulty: {difficulty}</p>
            <p>Preparation Time: {preparationTime}</p>
            <p>Cooking Time: {cookingTime}</p>
            <p>AdditionalTime: {additionalTime}</p>
            <p>Servings: {servings}</p>
            <p>Posted Date: {postDate}</p>
            <p>Posted by: {username}</p>
        </div>
    );
}

export default UserRecipe;