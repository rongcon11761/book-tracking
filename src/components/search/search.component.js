import { useEffect, useState, useCallback } from 'react';
import '../search/search.component.scss';
import PropTypes from 'prop-types';
import ListBookComponent from '../list-book/list-book.component';
import { Link } from 'react-router-dom';
import * as BookAPI from '../../utils/BookAPI';
import debounce from 'lodash.debounce';

const SearchComponent = ({ listBook, updateListBook }) => {
  console.log('before search = ', listBook);
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

  const debouncedFilter = useCallback(
    debounce((listBook, query) => {
      BookAPI.search(query)
        .then((searchedBooks) => {
          if (searchedBooks.error) {
            return setSearchedBook([]);
          }
          setSearchedBook(setShelves(searchedBooks, listBook));
          console.log('debouncedFilter = ', listBook);
        })
        .catch((err) => console.log('Search Error:', err));
    }, 500),
    []
  );

  useEffect(() => {
    if (!query) {
      return setSearchedBook([]);
    }
    debouncedFilter(listBook, query);
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
