import { render } from '@testing-library/react';
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

    handleSubmit() {

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
                                    <label htmlFor={stepId}>{`Step #${idx + 1}`}</label>
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