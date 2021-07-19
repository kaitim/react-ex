import React, { Component } from "react";
import { deleteMovie } from "../services/fakeMovieService";
import Like from "./like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";

class MovieList extends Component {
  state = {
    message: "",
    deleteMovie,
    currentPage: 1,
    pageSize: 4,
  };

  constructor() {
    super();
    this.state.movies = getMovies();
  }

  getMessage() {
    const count = this.state.movies.length;
    return count === 0
      ? "No movie in the list"
      : `Showing ${count} movies in the database.`;
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (currentPage) => {
    this.setState({ currentPage });
  };

  handleClickLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movie.like;
    this.setState({ movies });
  };

  render() {
    const { pageSize, currentPage, movies: AllMovies } = this.state;
    const { length: count } = this.state.movies;

    if (count === 0) return "Nothing";

    const movies = paginate(AllMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="message">{this.getMessage()}</div>

        <table className="table table-border">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {movies.map((movie) => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      onClick={() => this.handleClickLike(movie)}
                      isLike={movie.like}
                    ></Like>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger ml-3"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          itemsCount={count}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        ></Pagination>
      </React.Fragment>
    );
  }
}

export default MovieList;
