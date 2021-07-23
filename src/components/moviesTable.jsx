import React, { Component } from "react";
import Like from "./like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>,
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like and delete",
      content: (movie) => (
        <React.Fragment>
          <Like
            onClick={() => this.props.onLike(movie)}
            isLike={movie.like}
          ></Like>
          <button
            onClick={() => this.props.onDelete(movie)}
            className="btn btn-danger ml-3"
          >
            Delete
          </button>
        </React.Fragment>
      ),
    },
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
