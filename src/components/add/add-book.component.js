import { useState } from 'react';
import '../add/add-book.component.scss';
import PropTypes from 'prop-types';
import { v4 as uuids4 } from 'uuid';

function AddBookComponent({ listBook, onAddBook }) {
  const [bookExists, setBookExists] = useState(false);
  const [book, setBook] = useState({
    id: uuids4(),
    title: '',
    subTitle: '',
    authors: '',
    categories: '',
    imageLinks: { smallThumbnail: '', thumbnail: '' },
    urlImage: '',
    publisher: ''
  });

  /**
   * Check current book is Exists or not
   * @param {object} currBook - Book's information
   * @returns boolean
   */
  const checkBookExists = (currBook) => {
    for (let book of listBook) {
      if (book.title === currBook) {
        return true;
      }
    }
    return false;
  };

  /**
   * Handle add book
   * @param {event} event - Event of button
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const bookAlreadyExists = checkBookExists(book.title);

    if (!bookAlreadyExists) {
      book.imageLinks.smallThumbnail = book.urlImage;
      book.imageLinks.thumbnail = book.urlImage;
      delete book.urlImage;
      onAddBook(book);
    }

    setBookExists(bookAlreadyExists);
  };

  /**
   * Handle value of input onchange
   * @param {event} event - Event of input
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setBook({ ...book, [name]: value });
  };

  /**
   * Validate inputs to disable/enable add button
   * @returns boolean
   */
  const isDisabled = () => {
    const { title, subTitle, authors, categories, publisher } = book;
    return title === '' || subTitle === '' || authors === '' || categories === '' || publisher === '';
  };
  return (
    <div className="wrap add-container">
      <div className="title">Add book</div>
      <div className="add-form">
        <div className="row">
          <span className="col-2">Title:</span>
          <div className="col-4">
            <input
              className="add-input"
              name="title"
              type="text"
              onChange={handleInputChange}
              value={book.title}
              placeholder="Title"></input>
          </div>
        </div>
        <div className="row">
          <span className="col-2">Sub Title</span>
          <div className="col-4">
            <input
              className="add-input"
              name="subTitle"
              type="text"
              onChange={handleInputChange}
              value={book.subTitle}
              placeholder="Sub Title"></input>
          </div>
        </div>
        <div className="row">
          <span className="col-2">Authors</span>
          <div className="col-4">
            <input
              className="add-input"
              name="authors"
              type="text"
              onChange={handleInputChange}
              value={book.authors}
              placeholder="Authors"></input>
          </div>
        </div>
        <div className="row">
          <span className="col-2">Categories</span>
          <div className="col-4">
            <input
              className="add-input"
              name="categories"
              type="text"
              onChange={handleInputChange}
              value={book.categories}
              placeholder="Categories"></input>
          </div>
        </div>
        <div className="row">
          <span className="col-2">Image Links</span>
          <div className="col-4">
            <input
              className="add-input"
              name="urlImage"
              type="text"
              onChange={handleInputChange}
              value={book.urlImage}
              placeholder="Image Links"></input>
          </div>
        </div>
        <div className="row">
          <span className="col-2">Publisher</span>
          <div className="col-4">
            <input
              className="add-input"
              name="publisher"
              type="text"
              onChange={handleInputChange}
              value={book.publisher}
              placeholder="Publisher"></input>
          </div>
        </div>
        <div className="row">
          <button disabled={isDisabled()} type="submit" className="add-button" onClick={handleSubmit}>
            Add
          </button>
        </div>
        <div className="row">
          {bookExists ? <p className="error">You cannot add a Book that already exists.</p> : ''}
        </div>
      </div>
    </div>
  );
}

AddBookComponent.propTypes = {
  listBook: PropTypes.array.isRequired,
  onAddBook: PropTypes.func.isRequired
};
export default AddBookComponent;
