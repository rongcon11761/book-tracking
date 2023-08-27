import { useEffect, useState } from 'react';
import '../search/search.component.scss';
import PropTypes from 'prop-types';
import ListBookComponent from '../list-book/list-book.component';
import { Link } from 'react-router-dom';
import * as BookAPI from '../../utils/BookAPI';

const SearchComponent = ({ listBook, updateListBook }) => {
  const [query, setQuery] = useState('');
  const [searchBook, setSearchedBook] = useState([]);

  const setShelves = (searchedBooks, currentListBook) => {
    return searchedBooks.map((book) => {
      for (let item of currentListBook) {
        if (item.id === book.id) {
          return { ...book, shelf: item.shelf };
        }
      }
      return { ...book, shelf: '' };
    });
  };

  const updateQuery = (query) => {
    setQuery(query.trim());
  };

  useEffect(() => {
    if (query.length !== 0) {
      BookAPI.search(query)
        .then((searchedBooks) => {
          if (!query || searchedBooks.error) {
            return setSearchedBook([]);
          }
          setSearchedBook(setShelves(searchedBooks, listBook));
        })
        .catch((err) => console.log('Search Error:', err));
    } else setSearchedBook([]);
  }, [listBook, query]);

  return (
    <div className="wrap search-container">
      <div className="header-search">
        <Link to="/" className="secondary-btn">
          Back Home
        </Link>
        <input
          className="search-listBook"
          type="text"
          placeholder="Search by title, author, or ISBN"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}></input>
      </div>
      {
        <ListBookComponent
          handleClick={updateListBook}
          name=""
          listBook={searchBook.map((item) => item)}></ListBookComponent>
      }
    </div>
  );
};
SearchComponent.propTypes = {
  listBook: PropTypes.array.isRequired,
  updateListBook: PropTypes.func.isRequired
};
export default SearchComponent;
