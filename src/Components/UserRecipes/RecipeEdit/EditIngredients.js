import React, { Component } from 'react';

class EditIngredients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: this.props.userRecipeIngredients
        }
    }

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
        event.preventDefault();
        var token = sessionStorage.getItem('token');
        var ingredients = this.state.ingredients;
        var ingredientsLength = ingredients.length;
        for(let i = 0; i < ingredientsLength; i++){
            fetch(`https://localhost:44330/Ingredients/${ingredients[i].ingredientId}/recipe/${ingredients[i].recipeId}`, {
                method: "Put",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    ingredientId: ingredients[i].ingredientId,
                    ingredientName: ingredients[i].ingredientName,
                    amount: ingredients[i].amount,
                    recipeId: ingredients[i].recipeId,
                })
            })
                .then(response => response)
                .then(response => {
                    console.log("I am response: ", response);
                    console.log("ingredient " + i, " added!")
                    // sessionStorage.setItem("recipeId", response.recipeId);
                })
                .catch(error => {
                    console.log("There was an error ", error);
                })
        }     
    }

    render() {
        const ingredients = this.state.ingredients;
        return (
            <div className="new-recipe-container-image">
            <h3>Ingredients</h3>
            <div className="form">
                    <div className="row form-row">
                        <div className="col-lg-1 p-0 form-col">
                            <h6>#</h6>
                        </div>
                        <div className="col-lg-3 p-0 form-col">
                            <h5>Name</h5>
                        </div>

                        <div className="col-lg-8 p-0 form-col">
                            <h5>Amount</h5>
                        </div>

                    </div>
                    <form onSubmit={this.handleSubmit}>
                    {
                        ingredients.map((val, idx) => {
                            let ingredientId = `Ingredient-${idx}`, amountId = `amount-${idx}`
                            return (
                                <div key={idx}>
                                    <div className="row form-row">
                                        <div className="col-lg-1 p-0 form-col">
                                            <h6>{idx + 1}</h6>
                                        </div>
                                        <div className="col-lg-3 p-0 form-col">
                                            {/* <label htmlFor={ingredientId}>Name</label> */}


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
                                        <div className="col-lg-8 p-0 form-col">
                                            {/* <label htmlFor={amountId}>Amount</label> */}

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
                                            {/* <button className="btn-primary form-button-add" onClick={this.addIngredient}>+</button> */}
                                        </div>

                                    </div>

                                </div>
                            )
                        })
                    }

                    <input className="btn-primary form-button" type="submit" value="Submit" />
                </form>
            </div>

        </div>
        )
    }

}

export default EditIngredients; 