import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import BookCard from '../components/BookCard';
import BookDetailsModal from '../components/BookDetailsModal';

export default function Favorites() {
  const [favorites] = useLocalStorage('bf_favorites', []);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div>
      <h2>Favorites</h2>

      {favorites.length === 0 ? (
        <div className="notice">
          No favorites yet. Add some from the search page.
        </div>
      ) : (
        <div className="grid">
          {favorites.map((f) => (
            <BookCard
              key={f.key}
              book={f}
              onOpen={() => setSelectedBook(f)} // ✅ open details
            />
          ))}
        </div>
      )}

      {/* ✅ Show details modal if a book is selected */}
      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
