import React, { Component } from "react";
import Joi, { schema } from "joi-browser";
import { toast } from "react-toastify";
import { registerUser } from "../services/userservice";
import Form from "../common/form";
import auth from "../services/authservice";

class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };
  doSumit = async () => {
    try {
      const response = await registerUser(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      //if (data.response.status === 200)
      //  toast.success("User Registered Successfully");
      // this.props.history.push("/");
      window.location = "/"; //full refresh to home
      console.log(response);
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "UserName", "email")}
          {this.renderInput("password", "Pasword", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
