import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/movieList";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="content">
          <MovieList />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
