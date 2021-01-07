import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
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
        var postDate = recipe.postDate;
        var YYYY = postDate.slice(0, 4);
        var MM = postDate.slice(5, 7);
        var DD = postDate.slice(8, 10);
        var formattedDate = `${DD}/${MM}/${YYYY}`;

        return (
            <div key={recipeId} className="recipe-details-container">
                <div className="row recipe-details-header">
                    <div className="col recipe-details-col img-container">
                        <img src={imageDomain} alt="food" className="img-fill"/>
                        {/* <div className="recipe-details-img">
                            
                            <h1>Hi</h1>
                        </div> */}
                    </div>
                    <div className="col recipe-details-col">
                    <h1>{recipeName}</h1>
                        <p>{description}</p>



                        <p> <MdTimer /> Prep Time: {preparationTime} <GiChefToque /> {difficulty}
                            <IoMdPerson /> Serves {servings}</p>
                        <p>Cook Time: {cookingTime}</p>
                        <p>Add Time: {additionalTime}</p>


                        <h2>Equipments</h2>
                        {equipments.map((equipment) =>
                            <p key={equipment.equipmentId}>{equipment.equipmentName}</p>
                        )}
                    </div>
                </div>

                <Row>
                    <Col lg={5}>
                        <h1>Ingredients</h1>
                        {ingredients.map((ingredient) =>
                            <p key={ingredient.ingredientId}>{ingredient.amount} {ingredient.ingredientName} </p>
                            // <p>ingredient.amount</p>
                        )}
                    </Col>
                    <Col lg={7}>
                        <h1>Method</h1>
                        {stepsSorted.map((step) =>
                            <p key={step.stepId}>
                                <h5>STEP {step.stepNumber} {step.stepName}</h5>  {step.instruction}</p>
                        )}
                    </Col>
                </Row>

            </div>
        );
    };
}

export default RecipeDetails;
