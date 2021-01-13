import React, { Component } from 'react';
import '../../AddNewRecipe/NewRecipe.css';

class EditRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipe:this.props.userRecipeDetails,
            recipeName: this.props.userRecipeDetails.recipeName,
            description: this.props.userRecipeDetails.description,
            difficulty: this.props.userRecipeDetails.difficulty,
            preparationTime: this.props.userRecipeDetails.preparationTime,
            cookingTime: this.props.userRecipeDetails.cookingTime,
            additionalTime: this.props.userRecipeDetails.additionalTime,
            servings: this.props.userRecipeDetails.servings,
            recipeId: this.props.userRecipeDetails.recipeId,
            postDate: this.props.userRecipeDetails.postDate
        }
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        var userId = sessionStorage.getItem('userId');
        var token = sessionStorage.getItem('token');

        const {recipeId, recipeName, description, difficulty, preparationTime, cookingTime, additionalTime, servings, postDate} = this.state;

        fetch(`https://localhost:44330/Recipes/${recipeId}/user/${userId}`, {
            method: "Put",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                recipeId: recipeId,
                recipeName: recipeName,
                description: description,
                difficulty: difficulty,
                preparationTime: preparationTime,
                cookingTime: cookingTime,
                additionalTime: additionalTime,
                servings: servings,
                postDate: postDate,
                userId: userId
            })
        })
            .then(response => response)
            .then(response => {
                console.log("I am response: ", response);
                // sessionStorage.setItem("recipeId", response.recipeId);
            })
            .catch(error => {
                console.log("There was an error ", error);
            })
            this.props.setRecipeState();
    }

    render() {
        const { recipeName, description, difficulty, preparationTime, cookingTime, additionalTime, servings } = this.state

        return (
            <div className="new-recipe-container-form">
                I am Edit Recipe
                <form className="form">
                    <label>
                        Name:
                        <br />
                        <input type="text" name="recipeName" value={recipeName} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Description:
                        <br />
                        <textarea name="description" value={description} style={{ width: "400px", height: "120px" }} onChange={this.handleChange} required />
                    </label>
                    <br />
                    <label>
                        Difficulty:
                        <br />
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
                        <br />
                        <input type="text" name="preparationTime" value={preparationTime} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Cooking Time:
                        <br />
                        <input type="text" name="cookingTime" value={cookingTime} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Additional Time:
                        <br />
                        <input type="text" name="additionalTime" value={additionalTime} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Servings:
                        <br />
                        <input type="text" name="servings" value={servings} onChange={this.handleChange} />
                    </label>
                    <br />
                    <input className="btn-primary form-button" type="submit" value="Submit" onClick={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}

export default EditRecipe;