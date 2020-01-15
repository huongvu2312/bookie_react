import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: ""
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Set username value
  onChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  // Set password value
  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  // Set email value
  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onSubmit(e) {
    const user = {
      username: this.state.username,
      pass: this.state.password,
      email: this.state.email
    };

    axios.post(`http://localhost:3000/users`, user).then(() => {
      // go to login page
      this.props.history.push("/login");
    });

    e.preventDefault();
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Register</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              required
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <Link to={"/login"} className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
