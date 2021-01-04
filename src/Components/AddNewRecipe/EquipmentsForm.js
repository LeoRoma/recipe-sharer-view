import React, {Component} from 'react';

class EquipmentsForm extends Component{
    constructor() {
        super();
        this.state = {
            equipments: [{ equipmentName: ""}]
        }
    };

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
        var token = sessionStorage.getItem('token');
        var equipmentsLength = this.state.equipments.length;
        var equipments = this.state.equipments;
        var recipeId = sessionStorage.getItem("recipeId");
        event.preventDefault();
        console.log("hello")
        for(let i = 0; i < equipmentsLength; i++){
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
                    // sessionStorage.setItem("recipeId", response.recipeId);
                })
                .catch(error => {
                    console.log("There was an error ", error);
                })
        }
    }

    render() {
        let { equipments } = this.state;
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

export default EquipmentsForm;