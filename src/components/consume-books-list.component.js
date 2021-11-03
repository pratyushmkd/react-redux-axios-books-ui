import React, { Component } from "react";
import { connect } from "react-redux";
import { consumeBooks } from "../actions/google-books";
import classes from "./books-list.module.css";

class ConsumeBooksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
    this.search = this.search.bind(this);
    this.clickMe = this.clickMe.bind(this);

    this.state = {
      currentBook: null,
      currentIndex: -1,
      searchText: "",
    };
  }

  componentDidMount() {
    this.props.consumeBooks("demo");
  }

  onChangeSearchText(e) {
    const searchText = e.target.value;

    this.setState({
      searchText: searchText,
    });
  }

  refreshData() {
    this.setState({
      currentBook: null,
      currentIndex: -1,
    });
  }

  setActiveBook(book, index) {
    this.setState({
      currentBook: book,
      currentIndex: index,
    });
  }

  clickMe(book) {
    this.props.history.push("/add", { data: book });
  }

  search() {
    this.refreshData();

    this.props.consumeBooks(this.state.searchText);
  }

  render() {
    const { searchText, currentIndex } = this.state;
    const { googleBooks } = this.props;

    return (
      <div className={classes["main row"]}>
        <div className="row">
          <div className="col-md-4">
            <h1>Books List</h1>
          </div>
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Text to search..."
                value={searchText}
                onChange={this.onChangeSearchText}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.search}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <ul className={classes["cards"]}>
            {googleBooks &&
              googleBooks.map((book, index) => (
                <li
                  className={
                    classes["cards_item"] +
                    (index === currentIndex ? "active" : "")
                  }
                  key={index}
                >
                  <div className={classes["card"]}>
                    <div className={classes["card_image"]}>
                      {
                        <img
                          src={book.volumeInfo.imageLinks.thumbnail}
                          alt="imageLink"
                        />
                      }
                    </div>
                    <div className={classes["card_content"]}>
                      <h2 className={classes["card_title"]}>
                        {book.volumeInfo.title}
                      </h2>
                      <p className={classes["card_text"]}>
                        {book.volumeInfo.authors[0]} says:{" "}
                        {`${book.volumeInfo.description?.substring(0, 40)}...`}
                      </p>
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.clickMe.bind(this, book)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    googleBooks: state.googleBooks,
  };
};

export default connect(mapStateToProps, {
  consumeBooks,
})(ConsumeBooksList);
