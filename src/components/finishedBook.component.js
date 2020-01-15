import React, { Component } from "react";
import { Link } from "react-router-dom";
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

export default class FinishedBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
      columns: [],
      finishedBooks: []
    };

    this.setPage = this.setPage.bind(this);
    this.setRowsPerPage = this.setRowsPerPage.bind(this);
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

  render() {
    return (
      <div>
        <h3>Finished Book</h3>
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
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {this.state.columns.map(column => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
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
