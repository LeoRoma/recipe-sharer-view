import { render } from '@testing-library/react';
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

    handleSubmit(){

    }

    render() {
        console.log(this.props.userRecipeEquipments)
        const equipments = this.state.equipments;
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