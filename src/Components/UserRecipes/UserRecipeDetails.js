import { render } from '@testing-library/react';
import React, { Component } from 'react';

import EditEquipments from './RecipeEdit/EditEquipments';
import EditIngredients from './RecipeEdit/EditIngredients';
import EditRecipe from './RecipeEdit/EditRecipe';
import EditSteps from './RecipeEdit/EditSteps';

class UserRecipeDetails extends Component {


    render() {
        var userRecipe = this.props.userRecipeDetails;
        // console.log(userRecipe)
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


        // var YYYY = postDate.slice(0, 4);
        // var MM = postDate.slice(5, 7);
        // var DD = postDate.slice(8, 10);
        // var formattedDate = `${DD}/${MM}/${YYYY}`;

        return (

            <div key={recipeId}>
                {imageSuffix? <img src={imageDomain} style={{ width: "200px", height: "200px" }} alt="food" /> : null}
                <EditRecipe
                    userRecipeDetails={this.props.userRecipeDetails} 
                />

                <h2>Ingredients</h2>
                <EditIngredients 
                    userRecipeIngredients={this.props.userRecipeIngredients}
                />

                <h2>Method</h2>
                <EditSteps 
                    userRecipeSteps={this.props.userRecipeSteps}
                />

                <h2>Equipments</h2>
                <EditEquipments 
                    userRecipeEquipments={this.props.userRecipeEquipments}
                />
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