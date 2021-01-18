import React, { Component } from 'react';

class EditEquipments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            equipments: this.props.userRecipeEquipments
        };
    }

    handleChange = (event) => {
        if (["equipmentName"].includes(event.target.className) ) {
            let equipments = [...this.state.equipments]
            equipments[event.target.dataset.id][event.target.className] = event.target.value
            this.setState({ equipments }, () => console.log(this.state.equipments))
          } else {
            this.setState({ [event.target.name]: event.target.value })
          }
    }

    // addEquipment = (event) => {
    //     event.preventDefault();
    //     this.setState((prevState) => ({
    //         equipments: [...prevState.equipments, { equipmentName: ""}]
    //     }))
    // }

    handleSubmit = (equipmentId, equipmentName, recipeId) => {
        // event.preventDefault();

        var token = sessionStorage.getItem('token');
       
        // for(let i = 0; i < equipmentsLength; i++){

            fetch(`https://localhost:44330/Equipments/${equipmentId}/recipe/${recipeId}`, {
                method: "Put",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    equipmentId: equipmentId,
                    equipmentName: equipmentName,
                    recipeId: recipeId
                })
            })
                .then(response => response)
                .then(response => {
                    console.log(response);
                    console.log("equipment " + equipmentName, " added!")
                    // sessionStorage.setItem("recipeId", response.recipeId);
                })
                .catch(error => {
                    console.log("There was an error ", error);
                })
        
        // this.props.setEquipmentsState();
    }

    handleDelete = (equipmentId) => {
        // console.log(ingredientId);
        var token = sessionStorage.getItem('token');
        fetch("https://localhost:44330/Equipments/"  + equipmentId,{
            method: "Delete",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
            .then(response => response)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("There was an error ", error);
            })
            setTimeout(function () {
                window.location.reload(false);
            }, 10000)
    }

    
    confirmDelete = (equipmentId) => {
        console.log(equipmentId);
        if(window.confirm("Are you sure you want to delete this equipment?")){
            this.handleDelete(equipmentId);
        }
    }

    render() {
        // console.log(this.props.userRecipeEquipments)
        const equipments = this.state.equipments;
        // console.log(equipments)
        return (
            <div className="new-recipe-container-form">
                <h3>Equipments</h3>
                <div className="form">
                    <div className="row form-row">
                        <div className="col-lg-1 p-0 form-col">
                            <h5>#</h5>
                        </div>
                        <div className="col-lg-11 p-0 form-col">
                            <h5>Name</h5>
                        </div>
                    </div>
                    <form>
                        {
                            equipments.map((equipment, idx) => {
                                let equipmentId = `Equipment-${idx}`
                                return (
                                    <div key={idx}>
                                        <div className="row form-row">
                                            <div className="col-lg-1 p-0 form-col">
                                                <h5><label htmlFor={equipmentId}>{idx + 1}</label></h5>
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
                                                <button className="btn-outline-secondary" onClick={() => this.handleSubmit(equipment.equipmentId, equipment.equipmentName, equipment.recipeId)}>Update</button>
                                                <button  className="btn-outline-danger" onClick={() => this.confirmDelete(equipment.equipmentId)}>Delete</button>
                                            </div>
                                        </div>


                                    </div>

                                )
                            })
                        }

                        {/* <input className="btn-primary form-button" type="submit" value="Submit" /> */}
                    </form>
                </div>

            </div>
        );
    }
}

export default EditEquipments;