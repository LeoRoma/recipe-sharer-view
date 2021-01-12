import React, { Component } from 'react';

class IngredientsForm extends Component {
    constructor() {
        super();
        this.state = {
            ingredients: [{ ingredientName: "", amount: "" }]
        }
    };

    handleChange = (event) => {
        if (["ingredientName", "amount"].includes(event.target.className)) {
            let ingredients = [...this.state.ingredients]
            ingredients[event.target.dataset.id][event.target.className] = event.target.value
            this.setState({ ingredients }, () => console.log(this.state.ingredients))
        } else {
            this.setState({ [event.target.name]: event.target.value })
        }
    }

    addIngredient = (event) => {
        event.preventDefault();
        this.setState((prevState) => ({
            ingredients: [...prevState.ingredients, { ingredientName: "", amount: "" }]
        }))
    }

    handleSubmit = (event) => {
        var token = sessionStorage.getItem('token');
        var ingredientsLength = this.state.ingredients.length;
        var ingredients = this.state.ingredients;
        var recipeId = sessionStorage.getItem("recipeId");
        event.preventDefault();

        for (let i = 0; i < ingredientsLength; i++) {

            fetch("https://localhost:44330/Ingredients/post", {
                method: "Post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    ingredientName: ingredients[i].ingredientName,
                    amount: ingredients[i].amount,
                    recipeId: recipeId
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    console.log("ingredient " + i, " added!")
                    this.props.getIngredientsFormState();
                    // sessionStorage.setItem("recipeId", response.recipeId);
                })
                .catch(error => {
                    console.log("There was an error ", error);
                })
        }

    }

    render() {
        let { ingredients } = this.state;
        return (
            <div className="new-recipe-container">
                <h3>Ingredients</h3>
                <form>


                    {
                        ingredients.map((val, idx) => {
                            let ingredientId = `Ingredient-${idx}`, amountId = `amount-${idx}`
                            return (
                                <div key={idx}>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <label htmlFor={ingredientId}>{`Ingredient #${idx + 1}`}</label>
                                            <br />
                                            <input
                                                type="text"
                                                name="ingredientName"
                                                data-id={idx}
                                                id={ingredientId}
                                                value={ingredients[idx].ingredientName}
                                                className="ingredientName"
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor={amountId}>Amount</label>
                                            <br />
                                            <input
                                                type="text"
                                                name="amount"
                                                data-id={idx}
                                                id={amountId}
                                                value={ingredients[idx].amount}
                                                className="amount"
                                                onChange={this.handleChange}
                                                required
                                            /> 
                                            <button onClick={this.addIngredient}>+</button>
                                        </div>
                                        
                                    </div>
                                   
                                </div>
                            )
                        })
                    }
                
                    <input type="submit" value="Submit" onClick={this.handleSubmit} />
                </form>
            </div>
        );
    }
}

export default IngredientsForm;