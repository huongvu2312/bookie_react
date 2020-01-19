import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Header from "./components/header.component";
import Header2 from "./components/header2.component";
import Home from "./components/home.component";
import FinishedBook from "./components/finishedBook.component";
import DroppedBook from "./components/droppedBook.component";
import CurrentBook from "./components/currentBook.component";
import WishlistBook from "./components/wishlistBook.component";

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
    let header;
    let url = window.location.pathname;
    console.log(url);
    if (url === "/login" || url === "/register") {
      header = <Header />;
    } else {
      header = <Header2 logOuts={this.setIsLoginValue} />;
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
            <Route path="/finishedBook" component={FinishedBook} />
            <Route path="/droppedBook" component={DroppedBook} />
            <Route path="/currentBook" component={CurrentBook} />
            <Route path="/wishlist" component={WishlistBook} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
