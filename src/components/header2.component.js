import React, { Component } from "react";
import { Link } from "react-router-dom";

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
              <Link to={"/finishedBook"} className="nav-link">
                Finished Book
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/droppedBook"} className="nav-link">
                Dropped Book
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/currentBook"} className="nav-link">
                Current Reading
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/wishlist"} className="nav-link">
                Wishlist
              </Link>
            </li>
          </ul>

          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
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
