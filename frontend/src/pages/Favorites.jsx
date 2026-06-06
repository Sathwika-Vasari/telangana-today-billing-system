import React, { useState, useEffect } from 'react';
import jokeService from '../services/jokeService';
import useAlert from '../hooks/useAlert';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { success, error } = useAlert();

  useEffect(() => {
    fetchFavorites();
  }, [page]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await jokeService.getFavoriteJokes(page, 10);
      setFavorites(response.data || []);
      setTotalPages(response.pagination?.pages || 1);
    } catch (err) {
      error('Failed to fetch favorite jokes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove from favorites?')) return;
    try {
      await jokeService.deleteFavoriteJoke(id);
      success('Joke removed from favorites');
      fetchFavorites();
    } catch (err) {
      error('Failed to delete favorite');
    }
  };

  const handleCopy = (jokeText) => {
    navigator.clipboard.writeText(jokeText);
    success('Joke copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">⭐ Favorite Jokes</h1>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : favorites.length === 0 ? (
        <div className="card p-8 text-center text-gray-500">
          <p className="text-lg">No favorite jokes yet. Add some!</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {favorites.map((fav) => (
              <div key={fav.id} className="card p-6 border-l-4 border-primary-600">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(fav.created_at).toLocaleDateString()}
                    </p>
                    {fav.type === 'single' ? (
                      <p className="text-lg font-semibold text-gray-900">{fav.joke_text}</p>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-gray-900">{fav.setup}</p>
                        <p className="text-lg text-gray-700 italic pl-4">{fav.delivery}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4 flex-wrap">
                  <span className="badge badge-primary">{fav.category}</span>
                  <span className="badge badge-secondary">{fav.type}</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      handleCopy(fav.type === 'single' ? fav.joke_text : `${fav.setup}\n${fav.delivery}`)
                    }
                    className="btn-secondary text-sm"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={() => handleDelete(fav.id)}
                    className="btn-danger text-sm"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-2 rounded ${
                  page === i + 1 ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
