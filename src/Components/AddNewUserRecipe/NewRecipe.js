import React, {Component} from 'react';
import RecipeForm from './RecipeForm';

class NewRecipe extends Component{
    render(){
        return(
            <div>
                New Recipe
                <RecipeForm />
            </div>

        );
    }
}

export default NewRecipe;