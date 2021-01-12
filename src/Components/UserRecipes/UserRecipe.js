import React from 'react';
import { Link } from 'react-router-dom';
import DeleteRecipe from './RecipeDelete/DeleteRecipe';
import '../Recipes/Recipe.css'
const UserRecipe = ({
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
    getUserRecipeId }) => {


    var imageDomain = `https://localhost:44330/dynamic/images/${imageId}${imageSuffix}`;
    var YYYY = postDate.slice(0, 4);
    var MM = postDate.slice(5, 7);
    var DD = postDate.slice(8, 10);
    var formattedDate = `${DD}/${MM}/${YYYY}`;
    // var recipePagePath = `/${recipeName}`
    var capitalizeRecipeName = recipeName.charAt(0).toUpperCase() + recipeName.slice(1)

    return (
        <div className="recipe-card">
            {/* {imageSuffix ? <img src={imageDomain} style={{ width: "200px", height: "200px" }} alt="food" /> : null}
            <Link to="/user/recipe/details"><h1 onClick={getUserRecipeId.bind(this, recipeId)}>{recipeName}</h1></Link>
            <h2>{description}</h2>
            <p>Difficulty: {difficulty}</p>
            <p>Preparation Time: {preparationTime}</p>
            <p>Cooking Time: {cookingTime}</p>
            <p>AdditionalTime: {additionalTime}</p>
            <p>Servings: {servings}</p>
            <p>Posted Date: {formattedDate}</p>
            <p>Posted by: {username}</p> */}

            <div className="row no-gutters recipe-row">
                <div className="col-lg-4 p-0 recipe-image-container">
                    {imageSuffix ? <img src={imageDomain} className="card-img-top" alt="food" onClick={getUserRecipeId.bind(this, recipeId)} /> : null}
                </div>
                <div className="col-lg-8 p-0 recipe-header">
                    <div className="card-body">
                        <h1 className="card-title" onClick={getUserRecipeId.bind(this, recipeId)}>{capitalizeRecipeName}</h1>
                        <p className="card-text">{description}</p>
                        <p>Posted Date: {formattedDate}</p>
                    </div>

                </div>
                <div className="buttons">
                    <button onClick={getUserRecipeId.bind(this, recipeId)}><Link to="/user/recipe/details">Edit</Link></button>
                    <DeleteRecipe
                        recipeId={recipeId}
                    />
                </div>
            </div>

        </div>
    );
}

export default UserRecipe;