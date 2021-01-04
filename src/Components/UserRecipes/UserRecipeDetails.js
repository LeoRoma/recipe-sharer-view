import React, { Component } from 'react';


class UserRecipeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageDomainState: false,
            imageDomain: ''
        };
    }

    render() {
        var userRecipe = this.props.userRecipeDetails;
        var equipments = this.props.userRecipeEquipments;
        var steps = this.props.userRecipeSteps;
        var ingredients = this.props.userRecipeIngredients
        var user = this.props.userRecipeUser;
        var image = this.props.userRecipeImage;
        var postDate = this.props.userRecipePostDate;

        var imageId = image.id;

        var imageSuffix = image.suffix;
        var imageDomain = `https://localhost:44330/dynamic/images/${imageId}${imageSuffix}`;

        var recipeId = userRecipe.recipeId;

        var stepsSorted = steps.sort(function (a, b) { return a['stepNumber'] - b['stepNumber'] });
        var username = user.username;

        var recipeName = userRecipe.recipeName;
        var description = userRecipe.description;
        var difficulty = userRecipe.difficulty;
        var preparationTime = userRecipe.preparationTime;
        var cookingTime = userRecipe.cookingTime;
        var additionalTime = userRecipe.additionalTime;
        var servings = userRecipe.servings;

        var YYYY = postDate.slice(0, 4);
        var MM = postDate.slice(5, 7);
        var DD = postDate.slice(8, 10);
        var formattedDate = `${DD}/${MM}/${YYYY}`;
        // var imageDomain = this.props.userRecipeImageDomain
        return (

            <div key={recipeId}>
                {imageSuffix? <img src={imageDomain} style={{ width: "200px", height: "200px" }} alt="food" /> : null}
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


// const UserRecipeDetails = (userRecipeDetails) => {

//     console.log(userRecipeDetails)
//     // console.log(userRecipeDetails.userRecipeDetails.equipments)
//     var equipments = userRecipeDetails.userRecipeDetails.equipments
//     console.log(equipments[0])
//     return(
//         <div>
//             I am User Recipe Details
//         </div>
//     );
// }
export default UserRecipeDetails;