import React, { Component } from "react";
import propTypes from "prop-types";
import Book from "./Book";

export class BookShelf extends Component {
  static propTypes = {
    title: propTypes.string.isRequired,
    books: propTypes.array.isRequired,
    onChangeShelf: propTypes.func.isRequired,
  };
  render() {
    const { title, books, onChangeShelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} onChangeShelf={onChangeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
