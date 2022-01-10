import React, { Component } from "react";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTask(this.state.name);
        this.setState({
            name: ""
        });
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2 className="label-wrapper">
                    <label htmlFor="new-todo-input" className="label__lg">
                        What needs to be done?
                    </label>
                </h2>
                <input
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="text"
                    autoComplete="off"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <button type="submit" className="btn btn__primary btn__lg">
                    Add
                </button>
            </form>
        );
    }
}

export default Form;