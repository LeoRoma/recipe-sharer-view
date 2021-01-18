import React, { Component } from 'react';

class EditSteps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            steps: this.props.userRecipeSteps
        };
    }

    componentDidMount(){
        this.updateSteps();
    }

    handleChange = (event) => {
        if (["stepName", "instruction"].includes(event.target.className)) {
            let steps = [...this.state.steps]
            // steps['stepNumber'] = event.target.dataset.id;
            steps[event.target.dataset.id][event.target.className] = event.target.value
            this.setState({ steps }, () => console.log(this.state.steps))
        } else {
            this.setState({ [event.target.name]: event.target.value })
        }
    }

    addStep = (event) => {
        event.preventDefault();
        this.setState((prevState) => ({
            steps: [...prevState.steps, { instruction: "" }]
        }))
    }

    updateSteps = () => {
        // event.preventDefault();
        var token = sessionStorage.getItem('token');
        var steps = this.state.steps;
        var stepsLength = steps.length;
        for (let i = 0; i < stepsLength; i++) {
            fetch(`https://localhost:44330/Steps/${steps[i].stepId}/recipe/${steps[i].recipeId}`, {
                method: "Put",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    stepId: steps[i].stepId,
                    stepNumber: i + 1,
                    instruction: steps[i].instruction,
                    recipeId: steps[i].recipeId,
                })
            })
                .then(response => response)
                .then(response => {
                    console.log("I am response: ", response);
                    console.log("ingredient " + i, " added!")
                    // sessionStorage.setItem("recipeId", response.recipeId);
                })
                .catch(error => {
                    console.log("There was an error ", error);
                })
        }
        // this.props.setStepsState();
    }

    handleUpdate = (stepId, stepNumber, instruction, recipeId) => {
        // event.preventDefault();
        var token = sessionStorage.getItem('token');

            fetch(`https://localhost:44330/Steps/${stepId}/recipe/${recipeId}`, {
                method: "Put",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    stepId: stepId,
                    stepNumber: stepNumber,
                    instruction: instruction,
                    recipeId: recipeId,
                })
            })
                .then(response => response)
                .then(response => {
                    console.log("I am response: ", response);
                    console.log("step " + stepNumber, " updated!")
                    // sessionStorage.setItem("recipeId", response.recipeId);
                })
                .catch(error => {
                    console.log("There was an error ", error);
                })
        
        // this.props.setStepsState();
    }

    handleDelete = (stepId) => {
        // console.log(ingredientId);
        var token = sessionStorage.getItem('token');
        fetch("https://localhost:44330/Steps/"  + stepId,{
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
            }, 100)
    }

    
    confirmDelete = (stepId) => {
        console.log(stepId);
        if(window.confirm("Are you sure you want to delete this step?")){
            this.handleDelete(stepId);
            // setTimeout(function () {
            //     window.location.reload(false);
            // }.bind(this), 5000)
            // setTimeout(function () {
            //     this.handleSubmit();
            // }.bind(this), 5000)
        }
    }

    render() {
        const steps = this.state.steps;
        return (
            <div className="new-recipe-container-form">
                <h3>Steps</h3>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        {
                            steps.map((step, idx) => {
                                let stepId = `Step-${idx}`, instructionId = `Instruction-${idx}`
                                return (
                                    <div key={idx}>

                                        <label style={{ fontSize: "20px", fontWeight: "bold" }} htmlFor={stepId}># {idx + 1}</label>
                                        <br />
                                        <label htmlFor={instructionId}>Instruction</label>
                                        <br />
                                        <textarea
                                            name="instruction"
                                            data-id={idx}
                                            id={instructionId}
                                            value={steps[idx].instruction}
                                            className="instruction"
                                            style={{ width: "400px", height: "120px" }}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        {/* <button className="btn-primary form-button-add" onClick={this.addStep}>+</button> */}
                                        <br />
                                        <button className="btn-outline-secondary" onClick={() => this.handleUpdate(step.stepId, step.stepNumber, step.instruction, step.recipeId)}>Update</button>
                                        <button className="btn-outline-danger" onClick={() => this.confirmDelete(step.stepId)}>Delete</button>
                                    </div>
                                )
                            })
                        }

                        {/* <input className="btn-primary form-button" type="submit" value="Submit" /> */}
                    </form>
                </div>
            </div >
        );
    }
}

export default EditSteps;