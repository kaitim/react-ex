import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovies, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: 0,
      dailyRentalRate: 0,
    },
    errors: {},
    movies: [],
    genres: [],
  };

  componentDidMount() {
    // check id valid
    const id = this.props.match.params.id;

    let data = { ...this.state.data };
    const movies = getMovies();

    if (id) {
      console.log(id);
      const matched = movies.filter((m) => m._id === id);
      if (matched.length === 0) this.props.history.push("/not-found");
      // insert initial value
      data = { genreId: matched[0].genre._id, ...matched[0] };
      delete data["genre"];
    }

    this.setState({ data, movies, genres: getGenres() });
  }

  schema = {
    _id: Joi.allow(null),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().integer().min(0).label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Rate"),
  };

  doSubmit = (data) => {
    console.log("doSubmit", data);

    // server save
    // saveMovie
  };

  render() {
    const { genres } = this.state;

    return (
      <React.Fragment>
        <h1>New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
