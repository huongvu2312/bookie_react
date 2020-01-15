import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      users: []
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Set users database
  componentDidMount() {
    axios.get(`http://localhost:3000/users`).then(res => {
      const users = res.data;
      this.setState({ users });
    });
  }

  // Set username value
  onChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  // Set password value
  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit(e) {
    for (let user of this.state.users) {
      if (
        user.username === this.state.username &&
        user.pass === this.state.password
      ) {
        // go to home page
        this.props.history.push("/index");
      } else {
        alert("Hey your username or password is wrong");
      }
    }

    e.preventDefault();
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Login</h3>
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
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <Link to={"/register"} className="btn btn-link">
              Register
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
