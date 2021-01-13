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

    setRecipeState = () => {
        this.setState({editRecipeCompleted: true});
    }

    setImageState = () => {
        this.setState({editImageCompleted: true});
    }

    setEquipmentsState = () => {
        this.setState({editEquipmentsCompleted: true});
    }

    setIngredientsState = () => {
        this.setState({editIngredientsCompleted: true});
    }

    setStepsState = () => {
        this.setState({editStepsCompleted: true});
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
                    setRecipeState={this.setRecipeState}
                />

                <EditImage 
                    imageDomain={imageDomain}
                    recipeId={recipeId}
                    imageSuffix={imageSuffix}
                    setImageState={this.setImageState}
                />

                <EditEquipments 
                    userRecipeEquipments={this.props.userRecipeEquipments}
                    setEquipmentsState={this.setEquipmentsState}
                />
     
                <EditIngredients 
                    userRecipeIngredients={this.props.userRecipeIngredients}
                    setIngredientsState={this.setIngredientsState}
                />

                <EditSteps 
                    userRecipeSteps={this.props.userRecipeSteps}
                    setStepsState={this.setStepsState}
                />
              
            </div>
        );
    };

}


export default UserRecipeDetails;