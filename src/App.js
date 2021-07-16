import React, { Component } from "react";
import "./App.css";
// import MovieList from './components/movieList';
import Counters from "./components/counters";
import NavBar from "./components/navBar";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 10 },
      { id: 3, value: 5 },
      { id: 4, value: 0 },
      { id: 5, value: 0 },
    ],
  };

  handleReset = () => {
    const counters = [
      { id: 1, value: 0 },
      { id: 2, value: 10 },
      { id: 3, value: 5 },
      { id: 4, value: 0 },
      { id: 5, value: 0 },
    ];
    this.setState({ counters });
  };

  handleIncrement = (id) => {
    const counters = [...this.state.counters];
    const counter = counters.filter((c) => c.id === id)[0];
    const index = counters.indexOf(counter);
    counters[index] = counter;
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = (id) => {
    const counters = [...this.state.counters];
    const counter = counters.filter((c) => c.id === id)[0];
    const index = counters.indexOf(counter);
    counters[index] = counter;
    counters[index].value--;
    this.setState({ counters });
  };

  handleDelete = (id) => {
    const counters = this.state.counters.filter((c) => c.id !== id);
    console.log(counters);
    this.setState({ counters });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar count={this.state.counters.filter((c) => c.value > 0).length} />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
