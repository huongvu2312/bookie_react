import React, { Component } from "react";
import axios from "axios";

export default class DroppedBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finishedBooks: []
    };

    this.initialState = {
      id: 0,
      name: "",
      author: "",
      startDate: "",
      endDate: ""
    };

    if (props.product) {
      this.state = props.product;
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/finishedBooks`).then(res => {
      this.setState({ finishedBooks: res.data });
    });
  }

  deleteProduct(productId) {
    axios
      .delete(`http://localhost:3000/finishedBooks/${productId}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  render() {
    const { finishedBooks } = this.state;

    return (
      <div>
        <h1>Dropped Book</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {finishedBooks.map(book => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.startDate}</td>
                <td>{book.endDate}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => this.props.editProduct(book.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => this.deleteProduct(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
