import React, {Component} from 'react';

class RecipeDetails extends Component{
    constructor(){
        super()
        this.state={
            recipe: {},
        }
    };

    render(){
        var recipe = this.props.recipeInfo.recipe;
        var recipeId = recipe.recipeId;
        var equipments = recipe.equipments;
        var ingredients = recipe.ingredients;
        var steps = recipe.steps;
        var stepsSorted = steps.sort(function(a, b){return a['stepNumber']-b['stepNumber']}); 
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
        var postDate = recipe.postDate;
        var YYYY = postDate.slice(0,4);
        var MM = postDate.slice(5, 7);
        var DD = postDate.slice(8, 10);
        var formattedDate = `${DD}/${MM}/${YYYY}`;

        return(
            <div key={recipeId}>
                <img src={imageDomain} style={{width:"200px", height:"200px"}} alt="food"/>
                {recipeName}
                {description}
                {difficulty}
                {preparationTime}
                {cookingTime}
                {additionalTime}
                {servings}
                {formattedDate}
                {username}
                <h2>Ingredients</h2>
                {ingredients.map((ingredient) => 
                    <p key={ingredient.ingredientId}>{ingredient.ingredientName} {ingredient.amount}</p>
                    // <p>ingredient.amount</p>
                )}

                <h2>Method</h2>
                {stepsSorted.map((step) =>
                    <p key={step.stepId}>{step.stepNumber} {step.stepName} {step.instruction}</p> 
                )}

                <h2>Equipments</h2>
                {equipments.map((equipment) => 
                    <p key={equipment.equipmentId}>{equipment.equipmentName}</p>
                )}
            </div>
        );
    };
}

export default RecipeDetails;
