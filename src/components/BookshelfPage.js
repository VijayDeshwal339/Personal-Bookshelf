import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4 text-center font-bold">My Bookshelf</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {bookshelf.map(book => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookshelfPage;

