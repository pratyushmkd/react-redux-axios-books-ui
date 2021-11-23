import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBook from "./components/add-book.component";
import Book from "./components/book.component";
import BooksList from "./components/books-list.component";
import ConsumeBooksList from "./components/consume-books-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/#"} className="navbar-brand">
            Library App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/books"} className="nav-link">
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Book
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/consumeapi"} className="nav-link">
                Google Books
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <h1>Welcome to Library inventory</h1>
        </div>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/books","/#"]} component={BooksList} />
            <Route exact path={["/add","/add/:data"]} component={AddBook} />
            <Route path="/books/:id" component={Book} />
            <Route path="/consumeapi" component={ConsumeBooksList} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
