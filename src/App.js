import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from 'react-router-dom';
import { BookList } from './BookList';
class BooksApp extends React.Component {
  state = {
    bookList: [],
    searchedBooks: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  componentDidMount() {
    this.getBookData();
  }
  getBookData() {
    BooksAPI.getAll().then(data => {
      // console.log("data: ", data);
      this.setState(() => ({
        bookList: data
      }))
    });

  }
  updateShelf(book, event) {
    // console.log("Shelf", event.target.value);
    BooksAPI.update(book, event.target.value)
      .then(res => {
        this.getBookData();
      })
      .catch(err => console.log("Err : ", err));
  };
  searchBooks(event) {
    // console.log("event", event.target.value);
    if (event.target.value.length === 0) {
      this.setState(() => ({
        searchedBooks: []
      }))
      return;
    }
    BooksAPI.search(event.target.value)
      .then(data => {
        // console.log("Data", data);
        this.setState(() => ({
          searchedBooks: data
        }))
      })
      .catch(err => {
        this.setState(() => ({
          searchedBooks: []
        }))
        console.log("err : ", err);
      });
  }
  render() {
    return (
      <div className="app">
        {/* {this.state.bookList}     */}
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/"><button className="close-search">
                Close
              </button></Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(e) => this.searchBooks(e)} />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchedBooks && this.state.searchedBooks.length > 0 && this.state.searchedBooks.filter(searchedBook => searchedBook.imageLinks !== undefined).map(book => {
                  return (
                    <BookList
                      key={book.id}
                      book={book}
                      value={this.state.bookList.filter(bookData => bookData.id === book.id).map(b => b.shelf).length > 0 ? this.state.bookList.filter(bookData => bookData.id === book.id).map(b => b.shelf)[0] : "none"}
                      updateShelf={this.updateShelf.bind(this)}
                    />
                  )

                })}
              </ol>
            </div>
          </div>
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.bookList.filter(individualBook => individualBook.shelf === "currentlyReading").map((book) => {
                        return (
                          <BookList
                            key={book.id}
                            book={book}
                            value="currentlyReading"
                            updateShelf={this.updateShelf.bind(this)}
                          />
                        );
                      }


                      )}


                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.bookList.filter(individualBook => individualBook.shelf === "wantToRead").map((book) => {
                        return (
                          <BookList
                            key={book.id}
                            book={book}
                            value="wantToRead"
                            updateShelf={this.updateShelf.bind(this)}
                          />
                        );
                      }


                      )}


                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.bookList.filter(individualBook => individualBook.shelf === "read").map((book) => {
                        return (
                          <BookList
                            key={book.id}
                            book={book}
                            value="read"
                            updateShelf={this.updateShelf.bind(this)}
                          />
                        );
                      }


                      )}


                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"><button onClick={() => this.setState({ searchedBooks: [] })}>Add a book</button></Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
