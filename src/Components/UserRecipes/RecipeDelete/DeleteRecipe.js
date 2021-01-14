import React, {Component} from 'react';

class DeleteRecipe extends Component {


    deleteRecipe = () => {
        var recipeId = this.props.recipeId;
        var token = sessionStorage.getItem('token');
        // event.preventDefault();
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

    confirmDelete = () => {
        console.log("Hello");
        if(window.confirm("Are you sure you want to delete this recipe?")){
            this.deleteRecipe();
        }
    }

    render(){
        return (
            <div>
                <button onClick={this.confirmDelete}>Delete</button>
            </div>
        );
    }
    

}

export default DeleteRecipe;