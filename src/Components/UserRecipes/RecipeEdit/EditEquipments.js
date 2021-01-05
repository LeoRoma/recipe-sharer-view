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

    addEquipment = (event) => {
        event.preventDefault();
        this.setState((prevState) => ({
            equipments: [...prevState.equipments, { equipmentName: ""}]
        }))
    }

    handleSubmit = (event) => {
        event.preventDefault();

        var token = sessionStorage.getItem('token');
        var equipments = this.state.equipments;
        var equipmentsLength = equipments.length;

       
        for(let i = 0; i < equipmentsLength; i++){

            fetch(`https://localhost:44330/Equipments/${equipments[i].equipmentId}/recipe/${equipments[i].recipeId}`, {
                method: "Put",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    equipmentId: equipments[i].equipmentId,
                    equipmentName: equipments[i].equipmentName,
                    recipeId: equipments[i].recipeId
                })
            })
                .then(response => response)
                .then(response => {
                    console.log(response);
                    console.log("ingredient " + i, " added!")
                    // sessionStorage.setItem("recipeId", response.recipeId);
                })
                .catch(error => {
                    console.log("There was an error ", error);
                })
        }
    }

    render() {
        // console.log(this.props.userRecipeEquipments)
        const equipments = this.state.equipments;
        console.log(equipments)
        return (
            <div>
                <form>

                    <button onClick={this.addEquipment}>Add new Equipment</button>
                    {
                        equipments.map((val, idx) => {
                            let equipmentId = `Equipment-${idx}`
                            return (
                                <div key={idx}>
                                    <label htmlFor={equipmentId}>{`Equipment #${idx + 1}`}</label>
                                    <input
                                        type="text"
                                        name="equipmentName"
                                        data-id={idx}
                                        id={equipmentId}
                                        value={equipments[idx].equipmentName}
                                        className="equipmentName"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            )
                        })
                    }
                    <input type="submit" value="Submit" onClick={this.handleSubmit} />
                </form>
            </div>
        );
    }
}

export default EditEquipments;