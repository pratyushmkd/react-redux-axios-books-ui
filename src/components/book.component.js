import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBook, deleteBook } from "../actions/books";
import BooksDataService from "../services/books.service";

class Book extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.getBook = this.getBook.bind(this);    
    this.updateContent = this.updateContent.bind(this);
    this.removeBook = this.removeBook.bind(this);

    this.state = {
      currentBook: {
        id: null,
        title: "",
        price: 0,
        quantity: 0,        
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getBook(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          title: title,
        },
      };
    });
  }

  onChangePrice(e) {
    const price = Number(e.target.value);

    this.setState((prevState) => ({
      currentBook: {
        ...prevState.currentBook,
        price: price,
      },
    }));
  }
  onChangeQuantity(e) {
    const quantity = Number(e.target.value);

    this.setState((prevState) => ({
      currentBook: {
        ...prevState.currentBook,
        quantity: quantity,
      },
    }));
  }

  getBook(id) {
    BooksDataService.get(id)
      .then((response) => {
        this.setState({
          currentBook: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  
  updateContent() {
    this.props
      .updateBook(this.state.currentBook.id, this.state.currentBook)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The Book was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeBook() {
    this.props
      .deleteBook(this.state.currentBook.id)
      .then(() => {
        this.props.history.push("/books");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentBook } = this.state;

    return (
      <div>
        {currentBook ? (
          <div className="edit-form">
            <h4>Book</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBook.title}
                  onChange={this.onChangeTitle}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={currentBook.price}
                  onChange={this.onChangePrice}                  
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={currentBook.quantity}
                  onChange={this.onChangeQuantity}                  
                />
              </div>             
            </form>
            <button
              className="badge badge-danger mr-2"
              onClick={this.removeBook}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Book...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateBook, deleteBook })(Book);
