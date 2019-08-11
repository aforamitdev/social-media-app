import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class Signin extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToref: false,
      loading: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({
      [name]: event.target.value
    });
  };

  auth(data, next) {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(data));
    }
    next();
  }

  formSumbit = event => {
    this.setState({ loading: true });
    event.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    this.Signin(user).then(data => {
      console.log(data);

      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        //auth
        this.auth(data, () => {
          this.setState({ redirectToref: true });
        });
      }
    });
  };

  Signin = user => {
    // return axios.post("/signup", {
    //   user
    // })

    return fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  render() {
    const { email, password, error, redirectToref, loading } = this.state;
    if (redirectToref) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> Signin </h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading</h2>
          </div>
        ) : (
          ""
        )}
        <form action="">
          <div className="form-group">
            <label className="text-muted"> Email </label>
            <input
              type="email"
              className="form-control"
              onChange={this.handleChange("email")}
              value={email}
            />{" "}
          </div>{" "}
          <div className="form-group">
            <label className="text-muted"> Password </label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleChange("password")}
              value={password}
            />{" "}
          </div>{" "}
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

export default Signin;
