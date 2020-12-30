import React, {Component} from 'react';

class RecipePage extends Component{
    constructor(){
        super()
        this.state={
            recipe: {},
        }
    };

    render(){
        var recipe = this.props.recipeInfo.recipe;
        var recipeId = recipe.recipeId;
        var equipments = this.props.recipeInfo.recipe.equipments;
        var ingredients = this.props.recipeInfo.recipe.ingredients;
        var steps = this.props.recipeInfo.recipe.steps;

        var username = this.props.recipeInfo.username;
        var imageId = this.props.recipeInfo.imageId;
        var imageSuffix = this.props.recipeInfo.imageSuffix;
        
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
                {steps.map((step) =>
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

export default RecipePage;

// difficulty={recipe.difficulty}
// preparationTime={recipe.preparationTime}
// cookingTime={recipe.cookingTime}
// additionalTime={recipe.additionalTime}
// servings={recipe.servings}
// postDate={recipe.postDate}
// image={recipe.image.id}
// username={recipe.user.username}