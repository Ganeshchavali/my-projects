import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBooks(data.items);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="App">
      <h1>Book Search App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} placeholder="Search for books..." />
        <button type="submit">Search</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h2>{book.volumeInfo.title}</h2>
            <p>Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
            <p>Publisher: {book.volumeInfo.publisher || 'Unknown'}</p>
            <p>Published Date: {book.volumeInfo.publishedDate || 'Unknown'}</p>
            <p>Description: {book.volumeInfo.description || 'Not available'}</p>
            <img src={book.volumeInfo.imageLinks?.thumbnail || ''} alt={book.volumeInfo.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
