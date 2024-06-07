import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import BookshelfPage from './components/BookshelfPage';

function App() {
  return (
    <Router>
      <div className="sm:w-[80%] mx-auto p-5">
        <Routes>
          <Route exact path="/" element={<SearchPage />} />
          <Route path="/bookshelf" element={<BookshelfPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
