import React, { Component } from 'react';

class IngredientsForm extends Component {
    constructor() {
        super();
        this.state = {
            ingredients: [{ ingredientName: "", amount: "" }]
        }
    };

    handleChange = (event) => {
        if (["ingredientName", "amount"].includes(event.target.className) ) {
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
        var ingredientsLength = this.state.ingredients.length;
        var ingredients = this.state.ingredients;
        var recipeId = sessionStorage.getItem("recipeId");
        event.preventDefault();
        console.log("hello")
        for(let i = 0; i < ingredientsLength; i++){
            console.log(ingredients[i].ingredientName, ingredients[i].amount)

            fetch("https://localhost:44330/Ingredients/post", {
                method: "Post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': "Bearer " + token
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
            <div>
                <form>

                    <button onClick={this.addIngredient}>Add new ingredient</button>
                    {
                        ingredients.map((val, idx) => {
                            let ingredientId = `Ingredient-${idx}`, amountId = `amount-${idx}`
                            return (
                                <div key={idx}>
                                    <label htmlFor={ingredientId}>{`Ingredient #${idx + 1}`}</label>
                                    <input
                                        type="text"
                                        name="ingredientName"
                                        data-id={idx}
                                        id={ingredientId}
                                        value={ingredients[idx].ingredientName}
                                        className="ingredientName"
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor={amountId}>Amount</label>
                                    <input
                                        type="text"
                                        name="amount"
                                        data-id={idx}
                                        id={amountId}
                                        value={ingredients[idx].amount}
                                        className="amount"
                                        onChange={this.handleChange}
                                    />
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