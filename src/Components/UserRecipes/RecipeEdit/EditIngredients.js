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

    handleSubmit() {

    }

    render() {
        const ingredients = this.state.ingredients;
        console.log(ingredients)
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
        )
    }

}

export default EditIngredients; 