import React, { Component } from 'react';

class EditSteps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            steps: this.props.userRecipeSteps
        };
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
            steps: [...prevState.steps, { stepName: "", instruction: "" }]
        }))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var token = sessionStorage.getItem('token');
        var steps = this.state.steps;
        var stepsLength = steps.length;
        for(let i = 0; i < stepsLength; i++){
            fetch(`https://localhost:44330/Steps/${steps[i].stepId}/recipe/${steps[i].recipeId}`, {
                method: "Put",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    stepId: steps[i].stepId,
                    stepName: steps[i].stepName,
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
    }

    render() {
        const steps = this.state.steps;
        return (
            <div>
                <form>

                    <button onClick={this.addStep}>Add new Step</button>
                    {
                        steps.map((val, idx) => {
                            let stepId = `Step-${idx}`, instructionId = `Instruction-${idx}`
                            return (
                                <div key={idx}>
                      
                                    <label htmlFor={stepId}>{`Step # ${idx + 1}`}</label>
                                    <input
                                        type="text"
                                        name="stepName"
                                        data-id={idx}
                                        id={stepId}
                                        value={steps[idx].stepName}
                                        className="stepName"
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor={instructionId}>Instruction</label>
                                    <input
                                        type="text"
                                        name="instruction"
                                        data-id={idx}
                                        id={instructionId}
                                        value={steps[idx].instruction}
                                        className="instruction"
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

export default EditSteps;