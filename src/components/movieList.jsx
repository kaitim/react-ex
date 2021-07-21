import React, { Component } from "react";
import { deleteMovie } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class MovieList extends Component {
  state = {
    movies: [],
    genres: [],
    message: "",
    deleteMovie,
    currentPage: 1,
    pageSize: 4,
    selectedGenre: { _id: null, name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: null, name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  getMessage(count) {
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => {
            return m.genre._id === selectedGenre._id;
          })
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, genres, selectedGenre, sortColumn } =
      this.state;

    if (count === 0) return "Nothing";

    const { totalCount, data: movies } = this.getPagedData();

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
          <div className="message">{this.getMessage(totalCount)}</div>

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleClickLike}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount}
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
