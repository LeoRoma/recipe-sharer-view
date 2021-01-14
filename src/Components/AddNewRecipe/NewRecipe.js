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

    setRecipeFormState = () => {
        this.setState({recipeFormCompleted: true})
    }

    setImageFormState = () => {
        this.setState({imageFormCompleted: true})
    }

    setEquipmentsFormState = () => {
        this.setState({equipmentsFormCompleted: true})
    }

    setIngredientsFormState = () => {
        this.setState({ingredientsFormCompleted: true})
    }

    setStepsFormState = () => {
        this.setState({stepsFormCompleted: true})
    }

    render(){
        let imageForm, equipmentsForm, ingredientsForm, stepsForm;

        if(this.state.recipeFormCompleted === true){
            imageForm = <RecipeImageForm setImageFormState={this.setImageFormState}/>
        }else{
            imageForm = null
        }

        if(this.state.imageFormCompleted === true){
            equipmentsForm = <EquipmentsForm setEquipmentsFormState={this.setEquipmentsFormState}/>
        }else{
            equipmentsForm = null
        }

        if(this.state.equipmentsFormCompleted === true){
            ingredientsForm = <IngredientsForm setIngredientsFormState={this.setIngredientsFormState}/>
        }else{
            ingredientsForm = null
        }

        if(this.state.ingredientsFormCompleted === true){
            stepsForm = <StepsForm setStepsFormState={this.setStepsFormState} getRecipes={this.props.getRecipes}/>
        }else{
            stepsForm = null
        }
        return(
            <div className="new-recipe-container">
                <h1>New Recipe</h1>
                <RecipeForm setRecipeFormState={this.setRecipeFormState} />
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