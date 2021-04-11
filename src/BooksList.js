import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import propTypes from "prop-types";

class BooksList extends Component {
  static propTypes = {
    currentlyReadingBooks: propTypes.array.isRequired,
    wantToReadBooks: propTypes.array.isRequired,
    readBooks: propTypes.array.isRequired,
    onChangeShelf: propTypes.func.isRequired,
    clearSearchBooks: propTypes.func.isRequired,
  };

  render() {
    const {
      currentlyReadingBooks,
      wantToReadBooks,
      readBooks,
      onChangeShelf,
      clearSearchBooks,
    } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={currentlyReadingBooks}
              onChangeShelf={onChangeShelf}
            />
            <BookShelf
              title="Want to Read"
              books={wantToReadBooks}
              onChangeShelf={onChangeShelf}
            />
            <BookShelf
              title="Read"
              books={readBooks}
              onChangeShelf={onChangeShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link
            className="open-search-button"
            to="/search"
            onClick={clearSearchBooks}
          >
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

export default BooksList;
