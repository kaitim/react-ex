import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar";
import MovieList from "./components/movieList";
import Movie from "./components/movie";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";
import LoginForm from "./components/loginForm";
import RegisterForm from './components/registerForm';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="content">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={RegisterForm}></Route>

            <Route path="/movie/:id" component={Movie} />
            <Route path="/movies" component={MovieList} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />

            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
