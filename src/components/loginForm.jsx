import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = { account: { username: "", password: "" }, errors: {} };

  validate = () => {
    const errors = {};

    const { account } = this.state;
    if (account.username.trim() === "") errors.username = "username required";
    if (account.password.trim() === "") errors.password = "password required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") if (value.trim() === "") return "username is required.";
    if (name === "password") if (value.trim() === "") return "password is required.";
  };

  handleSubmit = (e) => {
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    e.preventDefault();
    // get from server
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Username: "
            name="username"
            onChange={this.handleChange}
            value={account.username}
            error={errors.username}
          />
          <Input
            label="Password: "
            name="password"
            onChange={this.handleChange}
            value={account.password}
            error={errors.password}
          />
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
