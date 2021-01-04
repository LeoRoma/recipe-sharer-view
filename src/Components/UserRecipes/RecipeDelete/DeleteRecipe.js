import React, {Component} from 'react';

class DeleteRecipe extends Component {


    handleSubmit = (event) => {
        var recipeId = this.props.recipeId;
        var token = sessionStorage.getItem('token');
        event.preventDefault();
        fetch("https://localhost:44330/Recipes/delete/"  + recipeId,{
            method: "Delete",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("There was an error ", error);
            })
            setTimeout(function () {
                window.location.reload(false);
            }, 500)
    }
    render(){
        return (
            <div>
                <button onClick={this.handleSubmit}>Delete</button>
            </div>
        );
    }
    

}

export default DeleteRecipe;