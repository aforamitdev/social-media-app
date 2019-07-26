import React, { useState, useReducer } from "react";

const formData = {
  name: "",
  email: "",
  password: ""
};

const formReducers = () => {
  return formData;
};

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeName = event => {
    setName(event.target.value);
  };

  const [state, dispatch] = useReducer(formReducers, formData);
  console.log(state);

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Signup</h2>
      <form action="">
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={this.handleChange("email")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange("password")}
          />
        </div>
        <button className="btn btn-raised btn-primary">Sumbit</button>
      </form>
    </div>
  );
}

export default Signup;
