import React, { Component } from 'react';

class EquipmentsForm extends Component {
    constructor() {
        super();
        this.state = {
            equipments: [{ equipmentName: "" }],
            isSubmitted: false
        }
    };

    handleChange = (event) => {
        if (["equipmentName"].includes(event.target.className)) {
            let equipments = [...this.state.equipments]
            equipments[event.target.dataset.id][event.target.className] = event.target.value
            this.setState({ equipments }, () => console.log(this.state.equipments))
        } else {
            this.setState({ [event.target.name]: event.target.value })
        }
    }

    addEquipment = (event) => {
        event.preventDefault();
        this.setState((prevState) => ({
            equipments: [...prevState.equipments, { equipmentName: "" }]
        }))
    }

    handleSubmit = (event) => {
        const token = sessionStorage.getItem('token');
        const equipmentsLength = this.state.equipments.length;
        const equipments = this.state.equipments;
        const recipeId = sessionStorage.getItem("recipeId");
        event.preventDefault();
        console.log("hello")
        for (let i = 0; i < equipmentsLength; i++) {
            console.log(equipments[i].equipmentName)

            fetch("https://localhost:44330/Equipments/post", {
                method: "Post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    equipmentName: equipments[i].equipmentName,
                    recipeId: recipeId
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    console.log("ingredient " + i, " added!")

                })
                .catch(error => {
                    console.log("There was an error ", error);
                })
        }
        this.props.setEquipmentsFormState()
        this.setState({isSubmitted: true});
    }

    render() {
        let { equipments, isSubmitted } = this.state;
        return (
            <section id="equipments">
                <div className="new-recipe-container-form">
                    <h3>Equipment</h3>
                    <div className="form">
                        <div className="row form-row">
                            <div className="col-lg-1 p-0 form-col">
                                <h6>#</h6>
                            </div>
                            <div className="col-lg-11 p-0 form-col">
                                <h5>Name</h5>
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            {
                                equipments.map((val, idx) => {
                                    let equipmentId = `Equipment-${idx}`
                                    return (
                                        <div key={idx}>
                                            <div className="row form-row">
                                                <div className="col-lg-1 p-0 form-col">
                                                    <h6><label htmlFor={equipmentId}>{idx + 1}</label></h6>
                                                </div>
                                                <div className="col-lg-11 p-0 form-col">
                                                    <input
                                                        type="text"
                                                        name="equipmentName"
                                                        data-id={idx}
                                                        id={equipmentId}
                                                        value={equipments[idx].equipmentName}
                                                        className="equipmentName"
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                    <button className="btn-primary form-button-add" onClick={this.addEquipment}>+</button>
                                                </div>
                                            </div>


                                        </div>

                                    )
                                })
                            }

                            {isSubmitted? <h6>Equipments Submitted!</h6> : <input className="btn-primary form-button" type="submit" value="Next" />}
                        </form>
                    </div>

                </div>
            </section>

        );
    }
}

export default EquipmentsForm;