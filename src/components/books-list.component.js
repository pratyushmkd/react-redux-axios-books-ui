import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveBooks,
  findBooksByTitle,
  findBooksByAuthor,
  // deleteAllBooks,
} from "../actions/books";
import { Link } from "react-router-dom";
import classes from "./books-list.module.css";

class BooksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveBook = this.setActiveBook.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.findByAuthor = this.findByAuthor.bind(this);
    // this.removeAllBooks = this.removeAllBooks.bind(this);

    this.state = {
      currentBook: null,
      currentIndex: -1,
      searchText: "",
    };
  }

  componentDidMount() {
    this.props.retrieveBooks();
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

  // removeAllBooks() {
  //   this.props
  //     .deleteAllBooks()
  //     .then((response) => {
  //       console.log(response);
  //       this.refreshData();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  findByTitle() {
    this.refreshData();

    this.props.findBooksByTitle(this.state.searchText);
  }

  findByAuthor() {
    this.refreshData();

    this.props.findBooksByAuthor(this.state.searchText);
  }

  render() {
    const { searchText, currentIndex } = this.state;
    const { books } = this.props;

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
                  onClick={this.findByTitle}
                >
                  Title
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.findByAuthor}
                >
                  Author
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <ul className={classes["cards"]}>
            {books &&
              books.map((book, index) => (
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
                        // eslint-disable-next-line jsx-a11y/alt-text                        
                        <img src={book.image} />
                        //https://picsum.photos/500/300/?image=10
                      }
                    </div>
                    <div className={classes["card_content"]}>
                      <h2 className={classes["card_title"]}>{book.title}</h2>
                      <p className={classes["card_price"]}>INR: {book.price}</p>
                      <p className={classes["card_text"]}>
                        {book.author} says: {book.description}
                      </p>
                      <h2 className={classes["card_text"]}>
                        Quantity: {book.quantity}
                      </h2>
                      <Link
                        className={classes["btn card_btn"]}
                        to={"/books/" + book.id}
                      >
                        Read More
                      </Link>
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
    books: state.books,
  };
};

export default connect(mapStateToProps, {
  retrieveBooks,
  findBooksByTitle,
  findBooksByAuthor,
  // deleteAllBooks,
})(BooksList);
