import React, { Component } from 'react';
import './NewRecipe.css';


class RecipeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipeName: '',
            description: '',
            difficulty: '',
            preparationTime: '',
            cookingTime: '',
            additionalTime: '',
            servings: '',
            isSubmitted: false
        };
    }

    handleChange = (event) => {
        // let value = event.target.value;

        // switch (event.target.name) {
        //     case 'recipeName':
        //         this.setState({ recipeName: value })
        //         break;
        //     case 'description':
        //         this.setState({ description: value })
        //         break;
        //     case 'difficulty':
        //         this.setState({ difficulty: value })
        //         break;
        //     case 'preparationTime':
        //         this.setState({ preparationTime: value })
        //         break;
        //     case 'cookingTime':
        //         this.setState({ cookingTime: value })
        //         break;
        //     case 'additionalTime':
        //         this.setState({ additionalTime: value })
        //         break;
        //     case 'servings':
        //         this.setState({ servings: value })
        //         break;
        //     default:
        // }
        this.setState({
            [event.target.name] : event.target.value
        })
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
                sessionStorage.setItem("recipeId", response.recipeId);
                sessionStorage.setItem("recipeName", response.recipeName);
                this.props.getRecipeFormState();
                this.setState({isSubmitted: true});
            })
            .catch(error => {
                console.log("There was an error ", error);
            })
    }

    greetone = () => {
        console.log("hello1")
    }
    render() {
        const isSubmitted = this.state;
        // console.log(this.state)
        return (
            <div className="new-recipe-container-form">
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                        <br />
                            <input type="text" name="recipeName" onChange={this.handleChange} required />
                        </label>
                        <br />
                        <label>
                            Description:
                        <br />
                            <textarea name="description" style={{ width: "400px", height: "120px" }} onChange={this.handleChange} required />
                        </label>
                        <br />
                        <label>
                            Difficulty:
                        <br />
                            <select name="difficulty" onChange={this.handleChange} required>
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
                            <input type="text" name="preparationTime" onChange={this.handleChange} required />
                        </label>
                        <br />
                        <label>
                            Cooking Time:
                        <br />
                            <input type="text" name="cookingTime" onChange={this.handleChange} required />
                        </label>
                        <br />
                        <label>
                            Additional Time:
                        <br />
                            <input type="text" name="additionalTime" onChange={this.handleChange} required />
                        </label>
                        <br />
                        <label>
                            Servings:
                        <br />
                            <input type="text" name="servings" onChange={this.handleChange} required />
                        </label>
                        <br />
                        {isSubmitted? <input className="btn-primary form-button" type="submit" value="Submit" /> : <h6>Recipe Submitted!</h6>}
                    </form>
                </div>
            </div>
        );
    }
}

export default RecipeForm;