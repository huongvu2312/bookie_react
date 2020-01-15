import React, { Component } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import "@fortawesome/fontawesome-free/css/all.css";

export default class FinishedBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
      columns: [],
      finishedBooks: [],
      name: "",
      author: "",
      startDate: "",
      endDate: "",
      editRowID: 0,
      nameEdit: "",
      authorEdit: "",
      startDateEdit: "",
      endDateEdit: ""
    };

    this.setPage = this.setPage.bind(this);
    this.setRowsPerPage = this.setRowsPerPage.bind(this);
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
    this.cancelEditRow = this.cancelEditRow.bind(this);
    this.saveEditRow = this.saveEditRow.bind(this);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeNameEdit = this.onChangeNameEdit.bind(this);
    this.onChangeAuthorEdit = this.onChangeAuthorEdit.bind(this);
    this.onChangeStartDateEdit = this.onChangeStartDateEdit.bind(this);
    this.onChangeEndDateEdit = this.onChangeEndDateEdit.bind(this);
  }

  useStyles = makeStyles({
    root: {
      width: "100%"
    },
    container: {
      maxHeight: 440
    }
  });

  // Set book database and columns
  componentDidMount() {
    this._mounted = true;
    const header = [
      { id: "name", label: "Name", minWidth: 200 },
      { id: "author", label: "Author", minWidth: 100 },
      {
        id: "startDate",
        label: "Start\u00a0Date",
        minWidth: 170
      },
      {
        id: "endDate",
        label: "End\u00a0Date",
        minWidth: 170
      }
    ];
    this.setState({ columns: header });

    axios.get(`http://localhost:3000/finishedBooks`).then(res => {
      const finishedBooks = res.data;
      if (this._mounted) {
        this.setState({ finishedBooks });
      }
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  setPage(p) {
    this.setState({ page: p });
  }

  setRowsPerPage(rpp) {
    this.setState({ rowsPerPage: rpp });
  }

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleChangeRowsPerPage = event => {
    this.setRowsPerPage(+event.target.value);
    this.setPage(0);
  };

  // Set name value
  onChangeName(event) {
    this.setState({ name: event.target.value });
  }

  // Set author value
  onChangeAuthor(event) {
    this.setState({ author: event.target.value });
  }

  // Set start date value
  onChangeStartDate(event) {
    this.setState({ startDate: event.target.value });
  }

  // Set end date value
  onChangeEndDate(event) {
    this.setState({ endDate: event.target.value });
  }

  // Set name value
  onChangeNameEdit(event) {
    this.setState({ nameEdit: event.target.value });
  }

  // Set author value
  onChangeAuthorEdit(event) {
    this.setState({ authorEdit: event.target.value });
  }

  // Set start date value
  onChangeStartDateEdit(event) {
    this.setState({ startDateEdit: event.target.value });
  }

  // Set end date value
  onChangeEndDateEdit(event) {
    this.setState({ endDateEdit: event.target.value });
  }

  addRow() {
    const newFinishedBook = {
      id: this.state.finishedBooks.length + 1,
      name: this.state.name,
      author: this.state.author,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };

    axios
      .post(`http://localhost:3000/finishedBooks`, newFinishedBook)
      .then(() => {
        window.location.reload();
      });
  }

  deleteRow(bookID) {
    axios.delete(`http://localhost:3000/finishedBooks/${bookID}`).then(() => {
      window.location.reload();
    });
  }

  editRow(id, name, author, startDate, endDate) {
    this.setState({ editRowID: id });
    this.setState({ nameEdit: name });
    this.setState({ authorEdit: author });
    this.setState({ startDateEdit: startDate });
    this.setState({ endDateEdit: endDate });
  }

  cancelEditRow() {
    this.setState({ editRowID: 0 });
    this.setState({ nameEdit: "" });
    this.setState({ authorEdit: "" });
    this.setState({ startDateEdit: "" });
    this.setState({ endDateEdit: "" });
  }

  saveEditRow() {
    const updateFinishedBook = {
      id: this.state.editRowID,
      name: this.state.nameEdit,
      author: this.state.authorEdit,
      startDate: this.state.startDateEdit,
      endDate: this.state.endDateEdit
    };

    axios
      .put(
        `http://localhost:3000/finishedBooks/${this.state.editRowID}`,
        updateFinishedBook
      )
      .then(() => {
        window.location.reload();
      });
  }

  render() {
    return (
      <div>
        <h3>Finished Book</h3>
        <div className="addRow">
          <input
            type="text"
            value={this.state.name}
            onChange={this.onChangeName}
          />
          <input
            type="text"
            value={this.state.author}
            onChange={this.onChangeAuthor}
          />
          <input
            type="text"
            value={this.state.startDate}
            onChange={this.onChangeStartDate}
          />
          <input
            type="text"
            value={this.state.endDate}
            onChange={this.onChangeEndDate}
          />
          <button className="btn btn-dark" type="submit" onClick={this.addRow}>
            Add row
          </button>
        </div>
        <br />

        <Paper className={this.useStyles.root}>
          <TableContainer className={this.useStyles.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {this.state.columns.map(column => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell key="actions" style={{ minWidth: 100 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.finishedBooks
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
                  .map(row => {
                    let action = "";
                    if (row.id === this.state.editRowID) {
                      action = (
                        <div className="actions">
                          <button
                            className="btn btn-success"
                            onClick={() => this.saveEditRow()}
                          >
                            <i className="fas fa-check-circle"></i>
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => this.cancelEditRow()}
                          >
                            <i className="far fa-window-close"></i>
                          </button>
                        </div>
                      );
                    } else {
                      action = (
                        <div className="actions">
                          <button
                            className="btn btn-dark"
                            onClick={() =>
                              this.editRow(
                                row.id,
                                row.name,
                                row.author,
                                row.startDate,
                                row.endDate
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-dark"
                            onClick={() => this.deleteRow(row.id)}
                          >
                            Delete
                          </button>
                        </div>
                      );
                    }

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {this.state.columns.map(column => {
                          const value = row[column.id];
                          if (row.id === this.state.editRowID) {
                            let editArea = "";
                            if (column.id === "name") {
                              editArea = (
                                <input
                                  type="text"
                                  value={this.state.nameEdit}
                                  onChange={this.onChangeNameEdit}
                                />
                              );
                            } else if (column.id === "author") {
                              editArea = (
                                <input
                                  type="text"
                                  value={this.state.authorEdit}
                                  onChange={this.onChangeAuthorEdit}
                                />
                              );
                            } else if (column.id === "startDate") {
                              editArea = (
                                <input
                                  type="text"
                                  value={this.state.startDateEdit}
                                  onChange={this.onChangeStartDateEdit}
                                />
                              );
                            } else if (column.id === "endDate") {
                              editArea = (
                                <input
                                  type="text"
                                  value={this.state.endDateEdit}
                                  onChange={this.onChangeEndDateEdit}
                                />
                              );
                            }
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {editArea}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          }
                        })}
                        <TableCell key="actions">{action}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={this.state.finishedBooks.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}
