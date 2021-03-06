import React, { Component } from 'react';

class RecipeImageForm extends Component {

  state = {
    image: null,
    file: null,
    isSubmitted: false
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
    const recipeId = sessionStorage.getItem('recipeId');
    const token = sessionStorage.getItem('token');
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);

    fetch("https://localhost:44330/Image/post/" + recipeId, {
      method: "Post",
      headers: {
        'Authorization': "Bearer " + token
      },
      body: form_data
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.props.setImageFormState();
        this.setState({isSubmitted: true});
      })
      .catch(error => {
        console.log("There was an error ", error);
      })
  };

  render() {
    const {isSubmitted} = this.state;
    return (
      <section id="image">
        <div className="new-recipe-container-image">
          <h3>Image</h3>
          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <div className="image-container">
                <img style={{ width: "200px", height: "200px" }} src={this.state.file} alt="recipe" />
              </div>

              <br />
              <input
                className="btn-primary form-button-add"
                type="file"
                id="image"
                accept="image/png, image/jpeg, image/jpg" onChange={this.handleImageChange} required />
              <br />
              {isSubmitted? <h6>Image Submitted!</h6> : <input className="btn-primary form-button" type="submit" value="Next" />}
            </form>

          </div>

        </div>
      </section>
    );
  }
}

export default RecipeImageForm;