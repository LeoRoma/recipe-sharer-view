import React, {Component} from 'react';
import './NewRecipe.css';

import RecipeForm from './RecipeForm';
import RecipeImageForm from './RecipeImageForm';
import EquipmentsForm from './EquipmentsForm';
import IngredientsForm from './IngredientsForm';
import StepsForm from './StepsForm';



class NewRecipe extends Component{
    constructor(){
        super();
        this.state = {
            recipeFormCompleted: false,
            imageFormCompleted: false,
            equipmentsFormCompleted: false,
            ingredientsFormCompleted: false,
            stepsFormCompleted: false
        };
    }

    getRecipeFormState = () => {
        this.setState({recipeFormCompleted: true})
    }

    getImageFormState = () => {
        this.setState({imageFormCompleted: true})
    }

    getEquipmentsFormState = () => {
        this.setState({equipmentsFormCompleted: true})
    }

    getIngredientsFormState = () => {
        this.setState({ingredientsFormCompleted: true})
    }

    getStepsFormState = () => {
        this.setState({stepsFormCompleted: true})
    }

    render(){
        let imageForm, equipmentsForm, ingredientsForm, stepsForm;

        if(this.state.recipeFormCompleted === true){
            imageForm = <RecipeImageForm getImageFormState={this.getImageFormState}/>
        }else{
            imageForm = null
        }

        if(this.state.imageFormCompleted === true){
            equipmentsForm = <EquipmentsForm getEquipmentsFormState={this.getEquipmentsFormState}/>
        }else{
            equipmentsForm = null
        }

        if(this.state.equipmentsFormCompleted === true){
            ingredientsForm = <IngredientsForm getIngredientsFormState={this.getIngredientsFormState}/>
        }else{
            ingredientsForm = null
        }

        if(this.state.ingredientsFormCompleted === true){
            stepsForm = <StepsForm getStepsFormState={this.getStepsFormState}/>
        }else{
            stepsForm = null
        }
        return(
            <div className="new-recipe-container">
                <h1>New Recipe</h1>
                <RecipeForm getRecipeFormState={this.getRecipeFormState} />
                {imageForm}
                {equipmentsForm}
                {ingredientsForm}
                {stepsForm}
                {/* <RecipeImageForm getImageFormState={this.getImageFormState} />
                <EquipmentsForm getEquipmentsFormState={this.getEquipmentsFormState} />
                <IngredientsForm getIngredientsFormState={this.getIngredientsFormState} />
                <StepsForm getStepsFormState={this.getStepsFormState} />        */}
            </div>

        );
    }
}



export default NewRecipe;