import React, {Component} from 'react';

class EditRecipe extends Component{
    constructor(props){
        super(props)
        this.state={
            recipeName: this.props.userRecipeDetails.recipeName,
            description: this.props.userRecipeDetails.description,
            difficulty: this.props.userRecipeDetails.difficulty,
            preparationTime: this.props.userRecipeDetails.preparationTime,
            cookingTime: this.props.userRecipeDetails.cookingTime,
            additionalTime: this.props.userRecipeDetails.additionalTime,
            servings: this.props.userRecipeDetails.servings
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(){

    }
    render(){
        const {recipeName, description, difficulty, preparationTime, cookingTime, additionalTime, servings} = this.state
        return(
            <div> 
                I am Edit Recipe
                <form className="form" onSubmit={this.handleSubmit}>
                    <label>
                        Name: 
                        <input type="text" name="recipeName" value={recipeName} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Description:
                        <input type="text" name="description" value={description} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Difficulty:
                        <select name="difficulty" value={difficulty} onChange={this.handleChange}>
                            <option value="none">None</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Preparation Time:
                        <input type="text" name="preparationTime" value={preparationTime} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Cooking Time:
                        <input type="text" name="cookingTime" value={cookingTime} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Additional Time:
                        <input type="text" name="additionalTime" value={additionalTime} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Servings:
                        <input type="text" name="servings" value={servings} onChange={this.handleChange} />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default EditRecipe;