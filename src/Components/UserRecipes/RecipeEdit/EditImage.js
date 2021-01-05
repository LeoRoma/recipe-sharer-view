import React, { Component } from 'react';

class EditImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        };
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

    handleSubmit(){

    }

    render() {
        // console.log(this.state)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

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

export default EditImage;