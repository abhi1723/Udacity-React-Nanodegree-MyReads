import React from 'react'
import './App.css'
export const BookList = (props) => {
    const {book,value,updateShelf} =props;
    return (
        <li>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            {/* {this.state.bookList.filter(bookData => bookData.id === book.id).map(b => b.shelf)[0]} */}
                            <select value={value} onChange={(e) => updateShelf(book, e)}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading" >Currently Reading</option>
                              <option value="wantToRead" >Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors && book.authors.map(author => author).join(",")}</div>
                      </div>
                    </li>
    );
};