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

    handleDelete = (event) => {
        event.preventDefault();
        var token = sessionStorage.getItem('token');
        var imageId = this.props.imageId
        console.log(imageId)

        fetch("https://localhost:44330/Image/delete/" + imageId, {
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

    handleSubmit = (event) => {
        event.preventDefault();
        var token = sessionStorage.getItem('token');
        var recipeId = this.props.recipeId
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
    }

    render() {
        // console.log(this.state)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <img style={{ width: "100px", height: "100px" }} src={this.state.file} />
                    <p>
                        <input type="file"
                            id="image"
                            accept="image/png, image/jpeg" onChange={this.handleImageChange} required />
                    </p>
                    <input type="submit" />

                    <button onClick={this.handleDelete}>Delete</button>
                </form>
            </div>
        );
    }
}

export default EditImage;