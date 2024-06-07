import React from 'react';

const BookCard = ({ book, addToBookshelf }) => {
  return (
    <div className="border p-4 flex flex-col gap-5">
      <div className='flex'>
        <div className='w-[40%]'>
          <p className="text-lg font-bold">Book Title:</p>
        </div>
        <div className='w-[50%] text-center'>
          <p className='text-wrap'>{book.title}</p>
        </div>
      </div>
      <p className='text-lg font-bold'>
        Edition Count: <span className='font-normal text-base'>{book.edition_count}</span>
      </p>
      {addToBookshelf && (
        <button
          onClick={() => addToBookshelf(book)}
          className="bg-green-500 w-[80%] mx-auto text-white px-1 py-2 rounded-lg"
        >
          Add to Bookshelf
        </button>
      )}
    </div>
  );
};

export default BookCard;
