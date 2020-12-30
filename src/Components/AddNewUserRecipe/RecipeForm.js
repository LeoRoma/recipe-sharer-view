import React, { Component } from 'react';

class RecipeForm extends Component {
    constructor() {
        super()
        this.state = {
            recipeName: '',
            description: '',
            difficulty: '',
            preparationTime: '',
            cookingTime: '',
            additionalTime: '',
            servings: ''
        };
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
        var token = sessionStorage.getItem('token');
        var userId = sessionStorage.getItem('userId');
        event.preventDefault();
        let { recipeName, description, difficulty, preparationTime, cookingTime, additionalTime, servings } = this.state
        console.log(recipeName, description, difficulty, preparationTime, cookingTime, additionalTime, servings, token, userId)

        fetch("https://localhost:44330/Recipes/post", {
            method: "Post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
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
            .then(response => response.json())
            .then(response => {
                console.log(response);
                sessionStorage.setItem("userId", response.recipeId);
            })
            .catch(error => {
                console.log("There was an error ", error);
            })
    }

    render() {
        // console.log(this.state)
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="recipeName" onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Description:
                        <input type="text" name="description" onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Difficulty:
                        <select name="difficulty" onChange={this.handleChange}>
                            <option value="none">None</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Preparation Time:
                        <input type="text" name="preparationTime" onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Cooking Time:
                        <input type="text" name="cookingTime" onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Additional Time:
                        <input type="text" name="additionalTime" onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Servings:
                        <input type="text" name="servings" onChange={this.handleChange} />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default RecipeForm;