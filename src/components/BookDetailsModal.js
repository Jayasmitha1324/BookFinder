import React, { useEffect, useState } from 'react';
import { coverUrl, openLibraryUrl } from '../api/openLibrary';

export default function BookDetailsModal({ book, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const key = book.key?.startsWith('/works/')
          ? book.key
          : `/works/${book.key}`;
        const res = await fetch(`https://openlibrary.org${key}.json`);
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error('Failed to fetch book details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [book]);

  const subjects =
    details?.subjects ||
    book.subject_facet ||
    book.subject ||
    book.subject_key ||
    [];

  // ✅ Save page state before leaving
  function handleOpenClick() {
    const state = JSON.parse(localStorage.getItem('bookFinderState') || '{}');
    state.lastVisited = new Date().toISOString();
    localStorage.setItem('bookFinderState', JSON.stringify(state));

    // open in same tab
    window.open(openLibraryUrl(book.key), '_self');
  }

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{book.title}</h2>

        <div className="modal-body">
          <div className="modal-left">
            {book.cover_i ? (
              <img src={coverUrl(book.cover_i, 'L')} alt="cover" />
            ) : (
              <div className="placeholder large">No cover</div>
            )}
          </div>

          <div className="modal-right">
            <p><strong>Author(s):</strong> {(book.author_name || []).join(', ')}</p>
            <p><strong>First published:</strong> {book.first_publish_year || '—'}</p>
            <p><strong>Edition count:</strong> {book.edition_count || '—'}</p>

            <p><strong>Subjects:</strong></p>
            {loading ? (
              <p>Loading subjects...</p>
            ) : subjects.length > 0 ? (
              <div className="subject-tags">
                {subjects.slice(0, 10).map((s, i) => (
                  <span key={i} className="tag">{s}</span>
                ))}
              </div>
            ) : (
              <p>—</p>
            )}

            <div className="card-actions">
              <button className="btn" onClick={handleOpenClick}>
                Open
              </button>
              <button className="btn" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
