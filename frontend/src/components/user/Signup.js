import React, { useState, useReducer, Component } from "react";
import axios from "axios"
class Signup extends Component {
constructor(){
  super();

  this.state={
    name:"",
    email:"",
    password:"",
    error:""
  };

}



handleChange=(name)=>(event)=>{
  this.setState({[name]:event.target.value});
};

formSumbit =event=>{
  event.preventDefault();
  const {name,email,password}=this.state
  const user={
    name,email,password
  }

this.Signup(user).then(data=>{
  if(data.error)  this.setState({error:data.error})
      else this.setState({
        error:"",
        name:"",
        email:"",
        password:""
      })
})

  
}

Signup=(user)=>{
  return fetch("http://localhost:8080/signup",{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify(user)})
  // }).then(res=>res.json()).catch(err=>console.log(err));

}


  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>
        <div className="alert alert-primary">
        {this.state.error} 
        </div>

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
