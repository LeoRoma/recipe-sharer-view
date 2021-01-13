import React from 'react';

import EditEquipments from './RecipeEdit/EditEquipments';
import EditImage from './RecipeEdit/EditImage';
import EditIngredients from './RecipeEdit/EditIngredients';
import EditRecipe from './RecipeEdit/EditRecipe';
import EditSteps from './RecipeEdit/EditSteps';

const UserRecipeDetails = ({
    userRecipeDetails,
    userRecipeEquipments,
    userRecipeSteps,
    userRecipeIngredients,
    userRecipeUser,
    userRecipeImage,
    userRecipePostDate }) => {

    var userRecipe = userRecipeDetails;
    // console.log(userRecipe)
    // console.log(userRecipe)
    // var equipments = this.props.userRecipeEquipments;
    // var steps = this.props.userRecipeSteps;
    // var ingredients = this.props.userRecipeIngredients
    // var user = this.props.userRecipeUser;
    var image = userRecipeImage;
    // var postDate = this.props.userRecipePostDate;

    var imageId = image.id;

    var imageSuffix = image.suffix;
    var imageDomain = `https://localhost:44330/dynamic/images/${imageId}${imageSuffix}`;

    var recipeId = userRecipe.recipeId;

    // var stepsSorted = steps.sort(function (a, b) { return a['stepNumber'] - b['stepNumber'] });


    // var YYYY = postDate.slice(0, 4);
    // var MM = postDate.slice(5, 7);
    // var DD = postDate.slice(8, 10);
    // var formattedDate = `${DD}/${MM}/${YYYY}`;

    return (
        <div key={recipeId}>
            {/* {imageSuffix? <img src={imageDomain} style={{ width: "200px", height: "200px" }} alt="food" /> : null} */}
            <EditRecipe
                userRecipeDetails={userRecipeDetails}
            />

            <EditImage
                imageDomain={imageDomain}
                recipeId={recipeId}
                imageSuffix={imageSuffix}
            />

            <EditIngredients
                userRecipeIngredients={userRecipeIngredients}
            />

            <h2>Method</h2>
            <EditSteps
                userRecipeSteps={userRecipeSteps}
            />

            <h2>Equipments</h2>
            <EditEquipments
                userRecipeEquipments={userRecipeEquipments}
            />
        </div>
    );
}


export default UserRecipeDetails;