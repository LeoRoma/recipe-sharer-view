import React from 'react';
import './Recipe.css'

import { GiChefToque } from 'react-icons/gi';
import { IoMdPerson } from 'react-icons/io'

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
    getRecipeId }) => {

    var imageDomain = `https://localhost:44330/dynamic/images/${imageId}${imageSuffix}`;
    var recipePagePath = `/${recipeName}`;

    var YYYY = postDate.slice(0, 4);
    var MM = postDate.slice(5, 7);
    var DD = postDate.slice(8, 10);
    var formattedDate = `${DD}/${MM}/${YYYY}`;
    var capitalizeRecipeName = recipeName.charAt(0).toUpperCase() + recipeName.slice(1)

    return (

        <div className="recipe-card">
            <div className="row no-gutters recipe-row">
                <div className="col-lg-4 p-0 recipe-image-container">
                    {imageSuffix ? <Link to={recipePagePath}><img src={imageDomain} className="card-img-top" alt="food" onClick={getRecipeId.bind(this, recipeId)} /></Link>: null}
                </div>
                <div className="col-lg-8 p-0 recipe-header">
                    <div className="card-body">
                        <Link to={recipePagePath}><h1 className="card-title" onClick={getRecipeId.bind(this, recipeId)}>{capitalizeRecipeName}</h1></Link>
                        <p className="card-text">{description}</p>
                    </div>
                
                </div>
                <div className="card-additional-info">
                       <GiChefToque /> {difficulty} - <IoMdPerson /> {servings} serves - Date: {formattedDate} - By: {username}
                    </div>

            </div>
          

            {/* <p>Difficulty: {difficulty}</p>
            <p>Preparation Time: {preparationTime}</p>
            <p>Cooking Time: {cookingTime}</p>
            <p>AdditionalTime: {additionalTime}</p>
            <p>Servings: {servings}</p>
            <p>Posted Date: {formattedDate}</p>
            <p>Posted by: {username}</p> */}
        </div>
    );
}

export default Recipe;

