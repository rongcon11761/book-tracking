import { useState } from 'react';
import '../search/search.component.scss';
import PropTypes from 'prop-types';
import ListBookComponent from '../list-book/list-book.component';
import { Link } from 'react-router-dom';

const SearchComponent = ({ listBook, updateListBook }) => {
  const [query, setQuery] = useState('');

  const updateQuery = (query) => {
    setQuery(query.trim());
  };
  const showingBooks =
    query === '' ? [] : listBook.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="wrap search-container">
      <div className="header-search">
        <Link to="/" className="secondary-btn">
          Back Home
        </Link>
        <input
          className="search-listBook"
          type="text"
          placeholder="Search Contacts"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}></input>
      </div>
      {<ListBookComponent handleClick={updateListBook} name="" listBook={showingBooks || []}></ListBookComponent>}
    </div>
  );
};
SearchComponent.propTypes = {
  listBook: PropTypes.array.isRequired,
  updateListBook: PropTypes.func.isRequired
};
export default SearchComponent;
