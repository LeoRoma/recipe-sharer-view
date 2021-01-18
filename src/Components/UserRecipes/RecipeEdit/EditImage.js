import React, { Component } from 'react';

class EditImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            file: this.props.imageDomain
        };
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

    deleteImage = () => {
        // event.preventDefault();
        var token = sessionStorage.getItem('token');
        var recipeId = this.props.recipeId
        console.log(recipeId)
        console.log("I am delete")

        fetch("https://localhost:44330/Image/delete/" + recipeId, {
            method: 'DELETE',
            headers: {
                // Accept: 'application/json',
                // 'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("There was an error ", error);
            })

    }

    postImage = () => {
        var token = sessionStorage.getItem('token');
        var recipeId = this.props.recipeId
        console.log("I am post")
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
            this.props.setImageState();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.deleteImage();
        setTimeout(function () {
            this.postImage()
        }.bind(this), 1000)
    }

    render() {
        // console.log(this.state)
        return (
            <div className="new-recipe-container-image">
                <h3>Image</h3>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="image-container">
                            {this.props.imageSuffix ? <img style={{ width: "200px", height: "200px" }} src={this.state.file} alt="recipe" /> : null}
                        </div>

                        <br />
                        <input
                            className="btn-secondary form-button-add"
                            type="file"
                            id="image"
                            accept="image/png, image/jpeg, image/jpg" onChange={this.handleImageChange} required />
                        <br />
                        <input className="btn-secondary form-button" type="submit" value="Update" />
                    </form>

                </div>

            </div>
        );
    }
}

export default EditImage;

