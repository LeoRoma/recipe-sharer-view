import React, { Component } from 'react';

import EditEquipments from './RecipeEdit/EditEquipments';
import EditImage from './RecipeEdit/EditImage';
import EditIngredients from './RecipeEdit/EditIngredients';
import EditRecipe from './RecipeEdit/EditRecipe';
import EditSteps from './RecipeEdit/EditSteps';

class UserRecipeDetails extends Component {
    constructor(){
        super();
        this.state = {
            editRecipeCompleted: false,
            editImageCompleted: false,
            editEquipmentsCompleted: false,
            editIngredientsCompleted: false,
            editStepsCompleted: false
        };
    }

    render() {
        var userRecipe = this.props.userRecipeDetails;
        var image = this.props.userRecipeImage;
        var imageId = image.id;
        var imageSuffix = image.suffix;
        var imageDomain = `https://localhost:44330/dynamic/images/${imageId}${imageSuffix}`;
        var recipeId = userRecipe.recipeId;
        return (

            <div key={recipeId}>
                {/* {imageSuffix? <img src={imageDomain} style={{ width: "200px", height: "200px" }} alt="food" /> : null} */}
                <EditRecipe
                    userRecipeDetails={this.props.userRecipeDetails} 
                />

                <EditImage 
                    imageDomain={imageDomain}
                    recipeId={recipeId}
                    imageSuffix={imageSuffix}
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


export default UserRecipeDetails;