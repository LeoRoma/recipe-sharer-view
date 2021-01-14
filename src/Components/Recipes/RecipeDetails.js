import React, { Component } from 'react';

import { GiChefToque } from 'react-icons/gi';
import { MdTimer } from 'react-icons/md'
import { IoMdPerson } from 'react-icons/io'

class RecipeDetails extends Component {
    constructor() {
        super()
        this.state = {

        }
    };

    render() {
        var recipe = this.props.recipeDetails;
        var recipeId = recipe.recipeId;
        var equipments = recipe.equipments;
        // console.log(equipments.length)
        var ingredients = recipe.ingredients;
        var steps = recipe.steps;
        var stepsSorted = steps.sort(function (a, b) { return a['stepNumber'] - b['stepNumber'] });
        var username = recipe.user.username;
        var imageId = recipe.image.id;
        var imageSuffix = recipe.image.suffix;

        var imageDomain = `https://localhost:44330/dynamic/images/${imageId}${imageSuffix}`;

        var recipeName = recipe.recipeName;
        var description = recipe.description;
        var difficulty = recipe.difficulty;
        var preparationTime = recipe.preparationTime;
        var cookingTime = recipe.cookingTime;
        var additionalTime = recipe.additionalTime;
        var servings = recipe.servings;

        var capitalizeRecipeName = recipeName.charAt(0).toUpperCase() + recipeName.slice(1)
        var postDate = recipe.postDate;
        var YYYY = postDate.slice(0, 4);
        var MM = postDate.slice(5, 7);
        var DD = postDate.slice(8, 10);
        var formattedDate = `${DD}/${MM}/${YYYY}`;

        return (
            <div key={recipeId} className="recipe-details-container">
                <h1>{capitalizeRecipeName}</h1>
                <p>Posted by: {username}</p>
                <p>{formattedDate}</p>
                <div className="row no-gutters recipe-details-header">
                    <div className="col-lg-6 p-0 recipe-details-col img-container">
                        <img src={imageDomain} alt="food" className="img-fill" />
                        {/* <div className="recipe-details-img">
                            
                            <h1>Hi</h1>
                        </div> */}
                    </div>
                    <div className="col-lg-6 recipe-details-col">
                        <div className="details">
                            <p><GiChefToque /> Difficulty: {difficulty}</p>
                            <p>  <IoMdPerson /> Serves: {servings}</p>
                            <p> <MdTimer /> Prep Time: {preparationTime} </p>
                            <p><MdTimer /> Cooking Time: {cookingTime}</p>
                            <p><MdTimer />  Additional Time: {additionalTime}</p>
                        </div>

                    </div>
                </div>
                <div className="description">
                    <h2>Description</h2>
                    <p>{description}</p>
                </div>
                <div className="equipments">
                    <h2>Equipments</h2>
                    {equipments.map((equipment) =>
                        <li key={equipment.equipmentId}>{equipment.equipmentName}</li>
                    )}
                </div>

                <div className="row recipe-instructions">
                    <div className="col-lg-5">
                        <h2>Ingredients</h2>
                        {ingredients.map((ingredient) =>
                            <p key={ingredient.ingredientId}>{ingredient.amount} {ingredient.ingredientName} </p>
                            // <p>ingredient.amount</p>
                        )}
                    </div>
                    <div className="col-lg-7">
                        <h2>Method</h2>
                        {stepsSorted.map((step) =>
                            <div key={step.stepId}>
                                <h5>STEP {step.stepNumber}</h5>  
                                <p>{step.instruction}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };
}

export default RecipeDetails;
