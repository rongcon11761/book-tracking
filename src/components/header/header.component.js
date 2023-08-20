import { Link } from 'react-router-dom';
import '../header/header.component.scss';

const HeaderComponent = () => {
  return (
    <div className="header">
      <img
        className="image-banner"
        src="https://www.shutterstock.com/image-photo/various-old-books-on-shelf-260nw-557138818.jpg"
        alt="banner"></img>
      <div className="logo">
        <label className="text-logo">Book Shelves</label>
      </div>
      <div className="navigation-bar">
        <ul className="navigation-list">
          <li className="navigation-item">
            <Link to="/" className="navigation-link">
              Home
            </Link>
          </li>
          <li className="navigation-item">
            <Link to="/create" className="navigation-link">
              Add Book
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderComponent;
