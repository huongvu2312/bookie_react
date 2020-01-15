import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Header from "./components/header.component";
import Header2 from "./components/header2.component";
import Home from "./components/home.component";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false };
    this.setIsLoginValue = this.setIsLoginValue.bind(this);
  }

  setIsLoginValue(il) {
    this.setState({ isLogin: il });
  }

  render() {
    const isLogin = this.state.isLogin;
    let header;
    if (isLogin) {
      header = <Header2 logOuts={this.setIsLoginValue} />;
    } else {
      header = <Header />;
    }
    return (
      <Router>
        <div className="container">
          {header}
          <br />
          <Switch>
            <Route
              path="/login"
              render={props => (
                <Login {...props} getIsLoginValues={this.setIsLoginValue} />
              )}
            />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
          </Switch>
        </div>
        <Redirect exact from="/" to="/login" />
      </Router>
    );
  }
}

export default App;
