import React, { Component } from "react";
import { connect } from "react-redux";
import { createBook, upload } from "../actions/books";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSelectFile = this.onChangeSelectFile.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.newBook = this.newBook.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      id: null,
      title: "",
      author: "",
      image: "https://picsum.photos/500/300/?image=10",
      description: "",
      price: 0,
      quantity: 0,
      published: false,
      selectedFiles: undefined,
      currentFile: undefined,

      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value,
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: Number(e.target.value),
    });
  }

  onChangePrice(e) {
    this.setState({
      price: Number(e.target.value),
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeSelectFile(e) {
    this.setState({
      image: "//https://picsum.photos/500/300/?image=10",
      selectedFiles: e.target.value
    });
  }

  saveBook() {
    const {title, description,author, price, quantity, image } = this.state;

    this.props
      .createBook(title, description, author, price, quantity, image)
      .then((data) => {
        this.setState({
          id: data.id,
          title: data.title,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          image: data.image,
          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  upload() {
    const { selectedFiles, author } = this.state;

    this.props
      .upload(selectedFiles, author)
      .then((data) => {
        this.setState({          
          selectedFiles: undefined          
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }


  newBook() {
    this.setState({
      id: null,
      title: "",      
      author: "",
      image: "",
      description: "",
      price: 0,
      quantity: 0,
      submitted: false,
    });
  }

  render() {
    const { selectedFiles } = this.state;
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newBook}>
              Add
            </button>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6">
            <div className="form-group">            
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                required
                value={this.state.quantity}
                onChange={this.onChangeQuantity}
                name="quantity"
              />
            </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">            
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                required
                value={this.state.author}
                onChange={this.onChangeAuthor}
                name="author"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>
            </div>
            <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            </div>
            <div className="col-md-8">
            <label className="btn btn-default">
          <input type="file" 
          id="selectedFiles"
          value={this.state.selectedFiles}
          onChange={this.onChangeSelectFile} 
          name="selectedFiles"
          />
        </label>
        </div>
        <div className="col-md-4">
        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>
              </div>
            <div className="col-md-6">
            <button onClick={this.saveBook} className="btn btn-success">
              Submit
            </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createBook, upload })(AddBook);
