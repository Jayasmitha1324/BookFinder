// src/api/openLibrary.js
const BASE = 'https://openlibrary.org';

/**
 * Search OpenLibrary
 * @param {{q: string, author?: string, year?: string, language?: string, page?: number, limit?: number}} options
 * @returns {Promise<{docs: Array, numFound: number}>}
 */
export async function searchBooks({ q, author, year, language, page = 1, limit = 12 }) {
  // Prevent empty search
  if (!q || !q.trim()) return { docs: [], numFound: 0 };

  const params = new URLSearchParams();

  // Basic search query
  params.set('q', q.trim());

  // Optional filters
  if (author) params.set('author', author.trim());
  if (year) params.set('first_publish_year', year.trim());
  if (language) params.set('language', language.toLowerCase());

  // Pagination: OpenLibrary uses 'page' and 'limit' is not always present but we can set 'limit' as 'limit' param
  params.set('page', String(page));
  params.set('limit', String(limit));

  const url = `${BASE}/search.json?${params.toString()}`;

  // Simple timeout wrapper for fetch
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      // Return empty result but keep caller aware numFound=0
      return { docs: [], numFound: 0 };
    }

    const data = await res.json();

    // Normalize docs: ensure an array exists
    const docs = Array.isArray(data.docs) ? data.docs : [];

    return {
      docs,
      numFound: typeof data.numFound === 'number' ? data.numFound : (data.num_found ?? 0)
    };
  } catch (err) {
    // On timeout / fetch error, return empty results so UI can handle gracefully
    // console.error('OpenLibrary search failed', err);
    return { docs: [], numFound: 0 };
  }
}

// Cover image helper
export function coverUrl(id, size = 'M') {
  if (!id) return null;
  return `https://covers.openlibrary.org/b/id/${id}-${size}.jpg`;
}

// Book page link helper
export function openLibraryUrl(key) {
  if (!key) return BASE;
  return `${BASE}${key}`;
}

export default searchBooks;
