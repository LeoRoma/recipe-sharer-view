import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

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
        var postDate = recipe.postDate;
        var YYYY = postDate.slice(0, 4);
        var MM = postDate.slice(5, 7);
        var DD = postDate.slice(8, 10);
        var formattedDate = `${DD}/${MM}/${YYYY}`;

        return (
            <div key={recipeId} className="recipe-details-container">
                <Row>
                    <Col>
                        <img src={imageDomain} style={{ width: "200px", height: "200px" }} alt="food" />
                 
                    </Col>
                    <Col>
                        <h1>{recipeName}</h1>
                        <p>{description}</p>

                        {difficulty}
                        {preparationTime}
                        {cookingTime}
                        {additionalTime}
                        {servings}
                        <h2>Equipments</h2>
                        {equipments.map((equipment) =>
                            <p key={equipment.equipmentId}>{equipment.equipmentName}</p>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1>Ingredients</h1>
                        {ingredients.map((ingredient) =>
                            <p key={ingredient.ingredientId}>{ingredient.ingredientName} {ingredient.amount}</p>
                            // <p>ingredient.amount</p>
                        )}
                    </Col>
                    <Col>
                        <h1>Methods</h1>
                        {stepsSorted.map((step) =>
                            <p key={step.stepId}>{step.stepNumber} {step.stepName} {step.instruction}</p>
                        )}
                    </Col>
                </Row>
            </div>
        );
    };
}

export default RecipeDetails;
