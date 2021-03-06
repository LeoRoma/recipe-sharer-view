import React, { Component } from 'react';

class StepsForm extends Component {
    constructor() {
        super();
        this.state = {
            steps: [{ instruction: "" }],
            isSubmitted: false
        }
    };

    handleChange = (event) => {
        if (["stepName", "instruction"].includes(event.target.className)) {
            let steps = [...this.state.steps];
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

    handleSubmit = (event) => {
        const token = sessionStorage.getItem('token');
        const stepsLength = this.state.steps.length;
        const steps = this.state.steps;
        const recipeId = sessionStorage.getItem("recipeId");
        event.preventDefault();
        console.log("hello")
        for (let i = 0; i < stepsLength; i++) {
            console.log(steps[i].stepNumber, steps[i].instruction)

            fetch("https://localhost:44330/Steps/post", {
                method: "Post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    stepNumber: i + 1,
                    instruction: steps[i].instruction,
                    recipeId: recipeId
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    console.log("steps " + i, " added!")
                    
                })
                .catch(error => {
                    console.log("There was an error ", error);
                })
        }
        this.props.setStepsFormState();
        this.setState({
            isSubmitted:true
        });
    }



    render() {
        const { steps, isSubmitted } = this.state;
        return (
            <div className="new-recipe-container-form">
                
                <h3>Steps</h3>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        {
                            steps.map((val, idx) => {
                                let stepId = `Step-${idx}`, instructionId = `Instruction-${idx}`
                                return (
                                    <div key={idx}>

                                        <label htmlFor={stepId}># {idx + 1}</label>
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
                                        <button className="btn-primary form-button-add" onClick={this.addStep}>+</button>

                                    </div>
                                )
                            })
                        }

                        {isSubmitted ? <h6>Steps Submitted!</h6> : <input className="btn-primary form-button" type="submit" value="Next" />}
                    </form>
                </div>
            </div >
        );
    }
}

export default StepsForm;