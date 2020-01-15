import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Header2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.logOuts(false);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={"/home"} className="navbar-brand">
          Bookie
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/create"} className="nav-link">
                Create
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/edit"} className="nav-link">
                Edit
              </Link>
            </li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li class="nav-item">
              <Link to={"/login"} className="nav-link" onClick={this.logOut}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
