import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import Book from "./Book";
import { debounce } from "lodash";

class Search extends Component {
  state = {
    query: "",
  };

  static propTypes = {
    onChangeQuery: propTypes.func.isRequired,
    booksResults: propTypes.array.isRequired,
    onSaveBook: propTypes.func.isRequired,
  };

  updateQuery = debounce((query) => {
    this.setState(() => ({
      query,
    }));
    this.props.onChangeQuery(query);
  }, 300);

  render() {
    const { query } = this.state;
    const { booksResults, onSaveBook } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksResults.length > 0 &&
              booksResults.map((book) => (
                <li key={book.id}>
                  <Book book={book} onChangeShelf={onSaveBook} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
