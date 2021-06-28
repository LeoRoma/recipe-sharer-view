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


    const imageDomain = `https://localhost:44330/dynamic/images/${imageId}${imageSuffix}`;
    const YYYY = postDate.slice(0, 4);
    const MM = postDate.slice(5, 7);
    const DD = postDate.slice(8, 10);
    const formattedDate = `${DD}/${MM}/${YYYY}`;
    const capitalizeRecipeName = recipeName.charAt(0).toUpperCase() + recipeName.slice(1)

    return (
        <div className="recipe-card">
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