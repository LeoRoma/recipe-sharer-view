import React, { Component } from 'react';

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
            recipeId: this.props.userRecipeDetails.recipeId
        }
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        let value = event.target.value;

        switch (event.target.name) {
            case 'recipeName':
                this.setState({ recipeName: value })
                break;
            case 'description':
                this.setState({ description: value })
                break;
            case 'difficulty':
                this.setState({ difficulty: value })
                break;
            case 'preparationTime':
                this.setState({ preparationTime: value })
                break;
            case 'cookingTime':
                this.setState({ cookingTime: value })
                break;
            case 'additionalTime':
                this.setState({ additionalTime: value })
                break;
            case 'servings':
                this.setState({ servings: value })
                break;
            default:
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        var userId = sessionStorage.getItem('userId');
        var token = sessionStorage.getItem('token');

        const {recipeId, recipeName, description, difficulty, preparationTime, cookingTime, additionalTime, servings} = this.state;

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
    }

    render() {
        const { recipeName, description, difficulty, preparationTime, cookingTime, additionalTime, servings } = this.state
        console.log(this.state.difficulty)
        return (
            <div>
                I am Edit Recipe
                <form className="form">
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
                    <input type="submit" value="Submit" onClick={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}

export default EditRecipe;