import React, {Component} from 'react';

import RecipeForm from './RecipeForm';
import RecipeImageForm from './RecipeImageForm';
import EquipmentsForm from './EquipmentsForm';
import IngredientsForm from './IngredientsForm';
import StepsForm from './StepsForm';


class NewRecipe extends Component{
    render(){
        return(
            <div>
                New Recipe
                <RecipeForm />
                <RecipeImageForm />
                <EquipmentsForm />
                <IngredientsForm />
                <StepsForm />       
            </div>

        );
    }
}

export default NewRecipe;