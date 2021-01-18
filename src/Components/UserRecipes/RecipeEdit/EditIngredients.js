import React, { Component } from 'react';
// import EditIngredient from './EditIngredient';

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

    // addIngredient = (event) => {
    //     event.preventDefault();
    //     this.setState((prevState) => ({
    //         ingredients: [...prevState.ingredients, { ingredientName: "", amount: "" }]
    //     }))
    // }

    handleSubmit = (ingredientId, ingredientName, amount, recipeId) => {
        // event.preventDefault();
        console.log(ingredientId, ingredientName, amount)
        var token = sessionStorage.getItem('token');
        // var ingredients = this.state.ingredients;
        // var ingredientsLength = ingredients.length;
        // for (let i = 0; i < ingredientsLength; i++) {
            fetch(`https://localhost:44330/Ingredients/${ingredientId}/recipe/${recipeId}`, {
                method: "Put",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    ingredientId: ingredientId,
                    ingredientName: ingredientName,
                    amount: amount,
                    recipeId: recipeId,
                })
            })
                .then(response => response)
                .then(response => {
                    console.log("I am response: ", response);
                    console.log("ingredient " + ingredientName, " added!");
                    // sessionStorage.setItem("recipeId", response.recipeId);
                })
                .catch(error => {
                    console.log("There was an error ", error);
                })
        
        // this.props.setIngredientsState();
    }

    // getIngredientId = (event, ingredientId) => {
    //     event.preventDefault();
    //     console.log("hello", ingredientId);
    // }
    handleDelete = (ingredientId) => {
        console.log(ingredientId);
        var token = sessionStorage.getItem('token');
        fetch("https://localhost:44330/Ingredients/"  + ingredientId,{
            method: "Delete",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
            .then(response => response)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("There was an error ", error);
            })
            setTimeout(function () {
                window.location.reload(false);
            }, 5000)
    }

    
    confirmDelete = (ingredientId) => {
        console.log("Hello");
        if(window.confirm("Are you sure you want to delete this ingredient?")){
            this.handleDelete(ingredientId);
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
                            <h5>#</h5>
                        </div>
                        <div className="col-lg-3 p-0 form-col">
                            <h5>Name</h5>
                        </div>

                        <div className="col-lg-8 p-0 form-col">
                            <h5>Amount</h5>
                        </div>

                    </div>
                    <form>
                        {
                            ingredients.map((ingredient, idx) => {
                                let ingredientId = `Ingredient-${idx}`, amountId = `amount-${idx}`

                                return (

                                    <div key={idx}>
                                        <div className="row form-row">
                                            <div className="col-lg-1 p-0 form-col">
                                                <h5>{idx + 1}</h5>
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
                                                <button className="btn-outline-secondary" onClick={() => this.handleSubmit(ingredient.ingredientId, ingredient.ingredientName, ingredient.amount, ingredient.recipeId)}>Update</button>
                                                <button  className="btn-outline-danger" onClick={() => this.confirmDelete(ingredient.ingredientId)}>Delete</button>
                                                {/* <EditIngredient 
                                                    ingredientName={ingredient.ingredientName}
                                                /> */}
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* <input className="btn-primary form-button" type="submit" value="Submit" /> */}
                    </form>
                </div>

            </div>
        )
    }

}

export default EditIngredients; 