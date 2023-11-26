import { SHELF } from '../../common/constants';
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
          {listBook &&
            listBook.length > 0 &&
            listBook.map((bookItem) => {
              return (
                <div key={bookItem.id} className="book-item">
                  <div className="container-item">
                    <img src={bookItem.imageLinks?.thumbnail} alt={bookItem.title} className="book-image"></img>
                    <div className="button-list">
                      <ul>
                        {SHELF.map((shelf) => {
                          return (
                            <li key={shelf.id}>
                              <button
                                onClick={() => handleClick(bookItem, shelf.code)}
                                className={`default-button ${bookItem.shelf === shelf.code ? 'active' : ''}`}>
                                {shelf.name}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <span className="book-name">{bookItem.title}</span>
                  <div className="book-authors">
                    {bookItem.authors &&
                      bookItem.authors.map((author) => {
                        return (
                          <label className="author-name" key={author}>
                            {author}
                          </label>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
        {listBook && listBook.length === 0 && (
          <div className="error-message">
            <span>Book Not Found</span>
          </div>
        )}
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
