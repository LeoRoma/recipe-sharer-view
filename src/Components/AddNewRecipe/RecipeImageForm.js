import React, { Component } from 'react';

class RecipeImageForm extends Component {
    state = {
        image: null,
        file: null
      };
    
      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      };
    
      handleImageChange = (e) => {
        this.setState({
          image: e.target.files[0],
          file: URL.createObjectURL(e.target.files[0])

        })
      };
    
      handleSubmit = (e) => {
        var recipeId = sessionStorage.getItem('recipeId');
        var token = sessionStorage.getItem('token');
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('image', this.state.image, this.state.image.name);
       
        fetch("https://localhost:44330/Image/post/" + recipeId, {
            method: "Post",
            headers: {
                // Accept: 'application/json',
                // 'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: form_data           
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("There was an error ", error);
            })
      };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <p>
                      <img style={{width:"100px", height:"100px"}}src={this.state.file} alt="recipe" />
                        <input type="file"
                            id="image"
                            accept="image/png, image/jpeg" onChange={this.handleImageChange} required />
                    </p>
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default RecipeImageForm;