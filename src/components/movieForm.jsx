import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

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
    genres: [],
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const id = this.props.match.params.id;
    if (id === "new") return;

    const movie = getMovie(id);
    if (!movie) return this.props.history.replace("/not-found");

    // insert initial value
    const data = { genreId: movie.genre._id, ...movie };
    delete data["genre"];

    this.setState({ data, genres });
  }

  schema = {
    _id: Joi.allow(null),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().integer().min(0).label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Rate"),
  };

  doSubmit = (data) => {
    saveMovie(data);
    this.props.history.push("/movies");
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
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
