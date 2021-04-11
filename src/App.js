import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookList from "./BooksList";
import Search from "./Search";

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    searchBooksResult: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
        currentlyReadingBooks: books.filter(
          (b) => b.shelf === "currentlyReading"
        ),
        wantToReadBooks: books.filter((b) => b.shelf === "wantToRead"),
        readBooks: books.filter((b) => b.shelf === "read"),
      }));
    });
  }

  onUpdateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      if (shelf === "none") {
        this.setState((currentState) => ({
          books: currentState.books.filter((b) => b.id !== book.id),
        }));
      } else {
        let books = this.state.books;
        for (let bookToChange of books) {
          if (book.id === bookToChange.id) {
            bookToChange.shelf = shelf;
          }
        }
        this.setState(() => ({
          books,
        }));
      }
      this.setState((currentState) => ({
        currentlyReadingBooks: currentState.books.filter((b) =>
          response.currentlyReading.includes(b.id)
        ),
        wantToReadBooks: currentState.books.filter((b) =>
          response.wantToRead.includes(b.id)
        ),
        readBooks: currentState.books.filter((b) =>
          response.read.includes(b.id)
        ),
      }));
    });
  };

  changeSearchQuery = (query) => {
    if (query !== "") {
      BooksAPI.search(query).then((searchBooksResult) => {
        if (Array.isArray(searchBooksResult)) {
          const bookIds = this.state.books.map((b) => b.id);
          for (let sbook of searchBooksResult) {
            if (bookIds.includes(sbook.id)) {
              sbook.shelf = this.state.books.find(
                (b) => b.id === sbook.id
              ).shelf;
            } else {
              sbook.shelf = "none";
            }
          }
          this.setState(() => ({
            searchBooksResult,
          }));
        } else {
          this.setState(() => ({
            searchBooksResult: [],
          }));
        }
      });
    } else {
      this.setState(() => ({
        searchBooksResult: [],
      }));
    }
  };

  saveBook = (book, shelf) => {
    if (this.state.books.map((b) => b.id).includes(book.id)) {
      this.onUpdateBookShelf(book, shelf);
      book.shelf = shelf;
    } else if (shelf !== "none") {
      BooksAPI.update(book, shelf).then((response) => {
        this.setState((currentState) => ({
          books: currentState.books.concat([book]),
        }));
      });
      switch (shelf) {
        case "currentlyReading":
          book.shelf = "currentlyReading";
          this.setState((currentState) => ({
            currentlyReadingBooks: currentState.currentlyReadingBooks.concat([
              book,
            ]),
          }));
          break;
        case "wantToRead":
          book.shelf = "wantToRead";
          this.setState((currentState) => ({
            wantToReadBooks: currentState.wantToReadBooks.concat([book]),
          }));
          break;
        case "read":
          book.shelf = "read";
          this.setState((currentState) => ({
            readBooks: currentState.readBooks.concat([book]),
          }));
          break;
        default:
          alert("error");
      }
    }
  };

  clearSearch = () => {
    this.setState(() => ({
      searchBooksResult: [],
    }));
  };

  render() {
    const {
      currentlyReadingBooks,
      wantToReadBooks,
      readBooks,
      searchBooksResult,
    } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              currentlyReadingBooks={currentlyReadingBooks}
              wantToReadBooks={wantToReadBooks}
              readBooks={readBooks}
              onChangeShelf={this.onUpdateBookShelf}
              clearSearchBooks={this.clearSearch}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              onChangeQuery={this.changeSearchQuery}
              booksResults={searchBooksResult}
              onSaveBook={this.saveBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
