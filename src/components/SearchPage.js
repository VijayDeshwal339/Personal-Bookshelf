import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";


axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [bookshelf, setBookshelf] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchInitialBooks = async () => {
      try {
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=a&limit=10&page=1`
        );
        setLoading(false);
        setAllBooks(response.data.docs);
        setResults(response.data.docs);
      } catch (err) {
        setLoading(false);
        setError("Failed to fetch books after multiple attempts. Please try again later.");
      }
    };

   
    const loadBookshelf = () => {
      const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
      setBookshelf(storedBookshelf);
    };

    fetchInitialBooks();
    loadBookshelf();
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const filteredResults = allBooks.filter((book) =>
        book.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults(allBooks);
    }
  };

  const addToBookshelf = (book) => {
    let updatedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    if (!updatedBookshelf.find((b) => b.key === book.key)) {
      updatedBookshelf.push(book);
      localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
      setBookshelf(updatedBookshelf);  
    }
  };

  const isBookInBookshelf = (bookKey) => {
    return bookshelf.some((book) => book.key === bookKey);
  };

  return (
    <div>
      <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between items-center mb-4">
        <div className="flex flex-col gap-5 justify-center items-center flex-grow">
          <label htmlFor="search" className="font-bold text-xl text-center">Search by book name:</label>
          <input
            id="search"
            type="text"
            value={query}
            onChange={handleSearch}
            className="w-[300px] p-1 border-2 border-black"
          />
        </div>
        <button className="bg-green-500 text-white px-5 py-2 rounded-lg">
          <Link to="/bookshelf">My Bookshelf</Link>
        </button>
      </div>

      

      {loading ? (
        <div className="flex justify-center self-center">
          <Spinner/>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              addToBookshelf={isBookInBookshelf(book.key) ? null : addToBookshelf}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
