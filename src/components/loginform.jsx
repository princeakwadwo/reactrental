import React, { Component } from "react";
import Joi, { schema } from "joi-browser";
import { toast } from "react-toastify";
import Form from "../common/form";
import auth from "../services/authservice";
import { Redirect } from "react-router-dom";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };
  //username = React.createRef(); //to get access to actual document object
  //   componentDidMount() {
  //     //life cycle hook
  //     this.username.current.focus();
  // ref = { this.username }
  //   }

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSumit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/"; // redirect the user to the location if state is false full refresh to home
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error("Login was not successful");
      console.log(ex);
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />; // redirect if already logged in
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "UserName")}
          {this.renderInput("password", "Pasword", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
