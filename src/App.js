import { Route, Routes } from 'react-router-dom';
import './App.scss';
import FooterComponent from './components/footer/footer.component';
import HeaderComponent from './components/header/header.component';
import HomeComponent from './components/home/home.component';
import { useEffect, useState } from 'react';
import * as BookAPI from '../src/utils/BookAPI';
import { TYPES_OF_BOOK } from './common/constants';
import AddBookComponent from './components/add/add-book.component';
import SearchComponent from './components/search/search.component';
const App = () => {
  const [listBook, setListBook] = useState([]);
  useEffect(() => {
    const getListBook = async () => {
      const res = await BookAPI.getAll();
      if (res) {
        setListBook(res);
      }
    };
    getListBook();
  }, []);

  /**
   * Change shelf of book and re-render list book
   * @param {object} bookItem book's information
   * @param {string} typeBook shelf of book
   */
  const updateListBook = async (bookItem, typeBook) => {
    try {
      const res = await BookAPI.update(bookItem, typeBook);
      if (res) {
        listBook.forEach((item) => {
          const currentlyReading = res.currentlyReading.some((bookId) => bookId === item.id);
          if (currentlyReading) {
            item.shelf = TYPES_OF_BOOK.CURRENTLY_READING;
          }
          const wantToRead = res.wantToRead.some((bookId) => bookId === item.id);
          if (wantToRead) {
            item.shelf = TYPES_OF_BOOK.WANT_TO_READ;
          }
          const read = res.read.some((bookId) => bookId === item.id);
          if (read) {
            item.shelf = TYPES_OF_BOOK.READ;
          }
        });
      }
      setListBook((listBook) => listBook.map((item) => item));
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const createBook = () => {
    // TODO
    // No API
    // setListBook([...listBook, book]);
  };

  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <Routes>
        <Route
          exact
          path="/"
          element={<HomeComponent listBook={listBook} updateListBook={updateListBook}></HomeComponent>}></Route>
        <Route
          path="/create"
          element={<AddBookComponent listBook={listBook} onAddBook={createBook}></AddBookComponent>}></Route>
        <Route
          path="/search"
          element={<SearchComponent listBook={listBook} updateListBook={updateListBook}></SearchComponent>}></Route>
      </Routes>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default App;
