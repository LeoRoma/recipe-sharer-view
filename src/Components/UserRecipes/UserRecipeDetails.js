import React, { Component } from 'react';

import EditEquipments from './RecipeEdit/EditEquipments';
import EditImage from './RecipeEdit/EditImage';
import EditIngredients from './RecipeEdit/EditIngredients';
import EditRecipe from './RecipeEdit/EditRecipe';
import EditSteps from './RecipeEdit/EditSteps';

class UserRecipeDetails extends Component {
    constructor() {
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
        this.setState({ editRecipeCompleted: true });
    }

    setImageState = () => {
        this.setState({ editImageCompleted: true });
    }

    setEquipmentsState = () => {
        this.setState({ editEquipmentsCompleted: true });
    }

    setIngredientsState = () => {
        this.setState({ editIngredientsCompleted: true });
    }

    setStepsState = () => {
        this.setState({ editStepsCompleted: true });
    }

    render() {
        const { editRecipeCompleted, editImageCompleted, editEquipmentsCompleted, editIngredientsCompleted, editStepsCompleted } = this.state;
        let userRecipe = this.props.userRecipeDetails;
        let image = this.props.userRecipeImage;
        let imageId = image.id;
        let imageSuffix = image.suffix;
        let imageDomain = `https://localhost:44330/dynamic/images/${imageId}${imageSuffix}`;
        let recipeId = userRecipe.recipeId;
        var steps = this.props.userRecipeSteps;
        var stepsSorted = steps.sort(function (a, b) { return a['stepNumber'] - b['stepNumber'] });
        return (

            <div key={recipeId} className="user-recipe-details-container">
                {/* {imageSuffix? <img src={imageDomain} style={{ width: "200px", height: "200px" }} alt="food" /> : null} */}
                {
                    editRecipeCompleted ?
                        <h2>Recipe Updated!</h2> : <EditRecipe
                            userRecipeDetails={this.props.userRecipeDetails}
                            setRecipeState={this.setRecipeState}
                        />
                }
                {
                    editImageCompleted ?
                        <h2>Image Updated!</h2> : <EditImage
                            imageDomain={imageDomain}
                            recipeId={recipeId}
                            imageSuffix={imageSuffix}
                            setImageState={this.setImageState}
                        />
                }

                {
                    editEquipmentsCompleted ?
                        <h2 style={{ color: "green" }}>Equipments Updated!</h2> : <EditEquipments
                            userRecipeEquipments={this.props.userRecipeEquipments}
                            setEquipmentsState={this.setEquipmentsState}
                        />
                }

                {
                    editIngredientsCompleted ?
                        <h2 style={{ color: "green" }}>Ingredients Updated!</h2> : <EditIngredients
                            userRecipeIngredients={this.props.userRecipeIngredients}
                            setIngredientsState={this.setIngredientsState}
                        />
                }

                {
                    editStepsCompleted ?
                        <h2 style={{ color: "green" }}>Steps Updated!</h2> : <EditSteps
                            userRecipeSteps={stepsSorted}
                            setStepsState={this.setStepsState}
                        />
                }

            </div>
        );
    };

}


export default UserRecipeDetails;