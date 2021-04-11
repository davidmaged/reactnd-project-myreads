import React, { Component } from "react";
import propTypes from "prop-types";

export class Book extends Component {
  static propTypes = {
    book: propTypes.object.isRequired,
    onChangeShelf: propTypes.func.isRequired,
  };

  render() {
    const { book, onChangeShelf } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks ? (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`,
              }}
            />
          ) : (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                textAlign: "center",
                paddingTop: 80,
              }}
            >
              NO Image Found
            </div>
          )}

          <div className="book-shelf-changer">
            <select
              value={book.shelf}
              onChange={(e) => {
                onChangeShelf(book, e.target.value);
              }}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          book.authors.map((author) => (
            <div className="book-authors" key={author}>
              {author}
            </div>
          ))}
      </div>
    );
  }
}

export default Book;
