import { TYPES_OF_BOOK, TYPE_NAME_BOOK } from '../../common/constants';
import '../list-book/list-book.component.scss';
import PropTypes from 'prop-types';

const ListBookComponent = ({ name, listBook, handleClick }) => {
  return (
    <div className="list-book-container">
      <div className="wrap category-type">
        {name && (
          <div className="title">
            <span className="text">{name}</span>
          </div>
        )}
        <div className="list-book">
          {listBook.map((bookItem) => {
            return (
              <div key={bookItem.id} className="book-item">
                <div className="container-item">
                  <img src={bookItem.imageLinks.thumbnail} alt="{title}" className="book-image"></img>
                  <div className="button-list">
                    <ul>
                      <li>
                        <button
                          onClick={() => handleClick(bookItem, TYPES_OF_BOOK.CURRENTLY_READING)}
                          className={`default-button ${
                            bookItem.shelf === TYPES_OF_BOOK.CURRENTLY_READING ? 'active' : ''
                          }`}>
                          {TYPE_NAME_BOOK.CURRENTLY_READING}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleClick(bookItem, TYPES_OF_BOOK.WANT_TO_READ)}
                          className={`default-button ${bookItem.shelf === TYPES_OF_BOOK.WANT_TO_READ ? 'active' : ''}`}>
                          {TYPE_NAME_BOOK.WANT_TO_READ}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleClick(bookItem, TYPES_OF_BOOK.READ)}
                          className={`default-button ${bookItem.shelf === TYPES_OF_BOOK.READ ? 'active' : ''}`}>
                          {TYPE_NAME_BOOK.READ}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <span className="book-name">{bookItem.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

ListBookComponent.propTypes = {
  name: PropTypes.string.isRequired,
  listBook: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default ListBookComponent;
