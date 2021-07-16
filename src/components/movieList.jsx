import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./like";

class MovieList extends Component {
  state = {
    message: "",
    deleteMovie,
  };

  constructor() {
    super();
    this.state.movies = getMovies();
    this.state.genres = getGenres();
  }

  getMessage() {
    const count = this.state.movies.length;
    return count === 0
      ? "No movie in the list"
      : `Showing ${count} movies in the database.`;
  }

  getGenreName(checkGenre) {
    const matchGenres = this.state.genres.filter(
      (genre) => genre._id === checkGenre._id
    );
    if (matchGenres.length === 0) return null;
    return matchGenres[0].name;
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleClickLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movie.like;
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) {
      return "NOthing";
    }

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
            {this.state.movies.map((movie) => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{this.getGenreName(movie.genre)}</td>
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
      </React.Fragment>
    );
  }
}

export default MovieList;
