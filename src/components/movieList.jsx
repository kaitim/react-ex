import React, { Component } from "react";
import { deleteMovie } from "../services/fakeMovieService";
import Like from "./like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";

class MovieList extends Component {
  state = {
    movies: [],
    genres: [],
    message: "",
    deleteMovie,
    currentPage: 1,
    pageSize: 4,
    selectedGenre: { _id: null, name: "All Genres" },
  };

  componentDidMount() {
    const genres = [{ _id: null, name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
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

  handleSelectGenre = (selectedGenre) => {
    this.setState({ selectedGenre, currentPage: 1 });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre,
    } = this.state;
    const { length: count } = this.state.movies;

    if (count === 0) return "Nothing";

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => {
            return m.genre._id === selectedGenre._id;
          })
        : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleSelectGenre}
          />
        </div>

        <div className="col">
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
            itemsCount={filtered.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default MovieList;
