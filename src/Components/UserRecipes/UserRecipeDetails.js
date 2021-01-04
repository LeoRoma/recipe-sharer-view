import React, { Component } from 'react';
import _ from 'lodash';

class UserRecipeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRecipe: {}
        };
    }

    render() {

        var userRecipe = this.props.userRecipeDetails;
        var equipmentsName = [];
        // var equipments = _.get(userRecipe, 'equipments')
        var equipmentsNameObject = (_.mapValues(userRecipe.equipments, 'equipmentName'));
        equipmentsName.push(Object.values(equipmentsNameObject))
        console.log(equipmentsName);
        var recipeId = userRecipe.recipeId;

        // console.log(equipment)

        // console.log(equipments[0])

        // for(let i = 0; i < equipments.length; i++){
        //     console.log(equipments[i])
        // }
        // var ingredients = recipe.ingredients;
        // var steps = recipe.steps;
        // var stepsSorted = steps.sort(function(a, b){return a['stepNumber']-b['stepNumber']}); 
        // var username = recipe.user.username;
        // var imageId = recipe.image.id;
        // var imageSuffix = recipe.image.suffix;

        // var imageDomain = `https://localhost:44330/dynamic/images/${imageId}${imageSuffix}`;

        var recipeName = userRecipe.recipeName;
        var description = userRecipe.description;
        var difficulty = userRecipe.difficulty;
        var preparationTime = userRecipe.preparationTime;
        var cookingTime = userRecipe.cookingTime;
        var additionalTime = userRecipe.additionalTime;
        var servings = userRecipe.servings;
        var postDate = userRecipe.postDate;
        // console.log(postDate)
        // console.log(typeof postDate)
        // var YYYY = postDate.slice(0,4);
        // var MM = postDate.slice(5, 7);
        // var DD = postDate.slice(8, 10);
        // var formattedDate = `${DD}/${MM}/${YYYY}`;

        return (
            <div key={recipeId}>
                {/* <img src={imageDomain} style={{width:"200px", height:"200px"}} alt="food"/> */}
                {recipeName}
                {description}
                {difficulty}
                {preparationTime}
                {cookingTime}
                {additionalTime}
                {servings}
                {/* {formattedDate} */}
                {/* {username} */}
                <h2>Ingredients</h2>
                {/* {ingredients.map((ingredient) => 
                    <p key={ingredient.ingredientId}>{ingredient.ingredientName} {ingredient.amount}</p>
                    // <p>ingredient.amount</p>
                )} */}

                <h2>Method</h2>
                {/* {stepsSorted.map((step) =>
                    <p key={step.stepId}>{step.stepNumber} {step.stepName} {step.instruction}</p> 
                )} */}

                <h2>Equipments</h2>
                {/* {equipments} */}
                {equipmentsName.map((equipment, index) =>
                    <p key={index}>{equipment}</p>
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