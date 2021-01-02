import React from 'react';

const DeleteRecipe = () => {


    handleSubmit = (event) => {
        event.preventDefault();
        fetch("https://localhost:44330/Recipes/delete/"  + id,{
            method: "Delete",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                equipmentName: equipments[i].equipmentName,
                recipeId: recipeId
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("There was an error ", error);
            })
    }

    return (
        <div>I am Delete Reciped</div>
    );

}

export default DeleteRecipe;