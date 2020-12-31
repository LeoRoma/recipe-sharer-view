import React, { Component } from 'react';

class RecipeImageForm extends Component {
    state = {
        image: null
      };
    
      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      };
    
      handleImageChange = (e) => {
        this.setState({
          image: e.target.files[0]
        })
      };
    
      handleSubmit = (e) => {
        var recipeId = sessionStorage.getItem('recipeId');
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('image', this.state.image, this.state.image.name);
       
        fetch("https://localhost:44330/Image/post/" + recipeId, {
            method: "Post",
            body: form_data           
        })
            .then(response => response.json())
            .then(response => {
                console.log("Image posted successfully");
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
                        {/* <input type="text" placeholder='Title' id='title' value={this.state.title} onChange={this.handleChange} required /> */}
                    </p>
                    <p>
                        {/* <input type="text" placeholder='Content' id='content' value={this.state.content} onChange={this.handleChange} required /> */}

                    </p>
                    <p>
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