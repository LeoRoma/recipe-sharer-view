import React, {Component} from 'react';

class StepsForm extends Component{
    constructor() {
        super();
        this.state = {
            steps: [{ stepName: "", instruction: "" }]
        }
    };

    handleChange = (event) => {
        if (["stepName", "instruction"].includes(event.target.className) ) {
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
        var stepsLength = this.state.steps.length;
        var steps = this.state.steps;
        var recipeId = sessionStorage.getItem("recipeId");
        event.preventDefault();
        console.log("hello")
        for(let i = 0; i < stepsLength; i++){
            console.log(steps[i].stepNumber, steps[i].stepName, steps[i].instruction)

            fetch("https://localhost:44330/Steps/post", {
                method: "Post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    stepNumber: i+1,
                    stepName: steps[i].stepName,
                    instruction: steps[i].instruction,
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
        let { steps } = this.state;
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

export default StepsForm;