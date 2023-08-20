import '../home/home.component.scss';
import ListBookComponent from '../list-book/list-book.component';
import { TYPES_OF_BOOK } from '../../common/constants';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HomeComponent = ({ listBook, updateListBook }) => {
  return (
    <div className="home-container">
      <ListBookComponent
        handleClick={updateListBook}
        name="Currently Reading"
        listBook={listBook.filter((item) => item.shelf === TYPES_OF_BOOK.CURRENTLY_READING) || []}></ListBookComponent>
      <ListBookComponent
        handleClick={updateListBook}
        name="Want To Read"
        listBook={listBook.filter((item) => item.shelf === TYPES_OF_BOOK.WANT_TO_READ) || []}></ListBookComponent>
      <ListBookComponent
        handleClick={updateListBook}
        name="Read"
        listBook={listBook.filter((item) => item.shelf === TYPES_OF_BOOK.READ) || []}></ListBookComponent>
      <Link to="/search" className="primary-btn search-button"></Link>
    </div>
  );
};
HomeComponent.propTypes = {
  listBook: PropTypes.array.isRequired,
  updateListBook: PropTypes.func.isRequired
};
export default HomeComponent;
