import React, { useState, useReducer, Component } from "react";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",

      password: "",
      error: ""
    };
  }

  formSumbit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name: name,
      email: email,
      password: password
    };
    console.log(user);
  };

  handleChange = names => event => {
    this.setState({ [names]: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>
        <form action="">
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleChange("name")}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              type="email"
              className="form-control"
              onChange={this.handleChange("email")}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleChange("password")}
              value={this.state.password}
            />
          </div>
          <button
            onClick={this.formSumbit}
            className="btn btn-raised btn-primary"
          >
            Sumbit
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
