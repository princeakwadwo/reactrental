import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";
import Select from "../common/select";
class Form extends Component {
  state = { data: {}, errors: {} };

  validate() {
    const errors = {};
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  }
  validateProperty({ name, value }) {
    //generate object dynamically
    const obj = { [name]: value };
    const sch = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, sch);
    return error ? error.details[0].message : null;
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errormessage = this.validateProperty(input);
    if (errormessage) errors[input.name] = errormessage;
    else delete errors[input.name];

    const data = { ...this.state.data }; //clone the state object
    data[input.id] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSumit();
  };
  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        label={label}
        value={data[name]}
        errors={errors[name]}
        name={name}
        onChange={this.handleChange}
      />
    );
  };
  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        options={options}
        label={label}
        value={data[name]}
        errors={errors[name]}
        name={name}
        onChange={this.handleChange}
      />
    );
  };
  renderButton = label => {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  };
}

export default Form;
