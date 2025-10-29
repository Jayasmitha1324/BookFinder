import React from 'react';
import { coverUrl } from '../api/openLibrary';
import useLocalStorage from '../hooks/useLocalStorage';

export default function BookCard({ book, onOpen }) {
  const [favorites, setFavorites] = useLocalStorage('bf_favorites', []);

  // Generate a consistent unique ID
  const id =
    book.key ||
    (book.cover_edition_key ? '/books/' + book.cover_edition_key : book.title);

  const isFav = favorites.some(f => f.key === id);

  // ✅ Unified format for saving favorites (matches API field names)
  function toggle() {
    const small = {
      key: id,
      title: book.title,
      author_name: book.author_name || book.authors || [],
      cover_i: book.cover_i || null,
      first_publish_year: book.first_publish_year || book.year || 'N/A',
      language: Array.isArray(book.language)
        ? book.language
        : [book.language || 'UNKNOWN'],
    };

    if (isFav) {
      setFavorites(favorites.filter(f => f.key !== id));
    } else {
      setFavorites([small, ...favorites]);
    }
  }

  // Prepare display data safely
  const coverImage = coverUrl(book.cover_i);
  const authorList = (book.author_name || []).slice(0, 3).join(', ');
  const year = book.first_publish_year || 'N/A';
  const language = Array.isArray(book.language)
    ? book.language.map(l => l.toUpperCase()).join(', ')
    : typeof book.language === 'string'
    ? book.language.toUpperCase()
    : 'UNKNOWN';

  return (
    <article className="card">
      <div className="cover">
        {coverImage ? (
          <img src={coverImage} alt={`Cover of ${book.title}`} />
        ) : (
          <div className="placeholder">No cover</div>
        )}
      </div>

      <div className="info">
        <h3 className="title">{book.title}</h3>
        <p className="muted">{authorList || 'Unknown Author'}</p>
        <p className="muted small">{year}</p>
        <p className="text-sm text-gray-500">Language: {language}</p>

        <div className="card-actions">
          <button className="btn small" onClick={() => onOpen && onOpen(book)}>
            Details
          </button>
          <button
            className={`btn small ${isFav ? 'active' : ''}`}
            onClick={toggle}
          >
            {isFav ? 'Unfav' : 'Fav'}
          </button>
        </div>
      </div>
    </article>
  );
}
