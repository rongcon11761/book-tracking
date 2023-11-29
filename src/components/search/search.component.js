import { useEffect, useState, useCallback } from 'react';
import '../search/search.component.scss';
import PropTypes from 'prop-types';
import ListBookComponent from '../list-book/list-book.component';
import { Link } from 'react-router-dom';
import * as BookAPI from '../../utils/BookAPI';
import debounce from 'lodash.debounce';

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
    setQuery(query);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilter = useCallback(
    debounce((listBook, query) => {
      BookAPI.search(query)
        .then((searchedBooks) => {
          if (searchedBooks.error) {
            return setSearchedBook([]);
          }
          setSearchedBook(setShelves(searchedBooks, listBook));
        })
        .catch((err) => console.log('Search Error:', err));
    }, 500),
    []
  );

  const updateBookShelf = (listBook, searchBook) => {
    searchBook &&
      searchBook.forEach((book) => {
        if (book.shelf !== '' && !listBook.find((item) => item.id === book.id)) {
          listBook.push(book);
        }
      });
  };

  useEffect(() => {
    if (!query) {
      return setSearchedBook([]);
    }
    updateBookShelf(listBook, searchBook);
    debouncedFilter(listBook, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
