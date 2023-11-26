import { Route, Routes } from 'react-router-dom';
import './App.scss';
import FooterComponent from './components/footer/footer.component';
import HeaderComponent from './components/header/header.component';
import HomeComponent from './components/home/home.component';
import { useEffect, useState } from 'react';
import * as BookAPI from '../src/utils/BookAPI';
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
   * @param {object} book book's information
   * @param {string} shelf shelf of book
   */
  const updateListBook = async (book, shelf) => {
    try {
      book.shelf = shelf;
      BookAPI.update(book, shelf).then(() => {
        setListBook((listBook) => listBook.map((item) => (item.id === book.id ? book : item)));
        console.log('update list book = ', listBook);
      });
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
