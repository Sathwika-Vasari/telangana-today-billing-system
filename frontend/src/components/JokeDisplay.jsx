import React from 'react';

const JokeDisplay = ({ joke, loading, error, onNextJoke, onAddFavorite, onCopyJoke }) => {
  if (loading) {
    return (
      <div className="card p-8 text-center">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading a funny joke...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-8 border-l-4 border-danger-500 bg-danger-50">
        <p className="text-danger-800 font-semibold">Oops! Something went wrong</p>
        <p className="text-danger-700 text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (!joke) {
    return (
      <div className="card p-8 text-center text-gray-500">
        <p className="text-lg">😂 Click "Get Joke" to start laughing!</p>
      </div>
    );
  }

  if (joke.error) {
    return (
      <div className="card p-8 text-center bg-warning-50 border-l-4 border-warning-500">
        <p className="text-warning-800">No joke available for this category/type</p>
        <p className="text-warning-700 text-sm mt-2">Try another category</p>
      </div>
    );
  }

  return (
    <div className="card p-8 border-l-4 border-primary-600">
      {/* Joke Category and Type */}
      <div className="flex gap-2 mb-4">
        <span className="badge badge-primary">{joke.category}</span>
        <span className="badge badge-secondary">{joke.type}</span>
      </div>

      {/* Joke Content */}
      <div className="my-6">
        {joke.type === 'single' ? (
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-900 leading-relaxed">
              {joke.joke}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold text-gray-900">{joke.setup}</p>
            </div>
            <div className="pl-6 border-l-2 border-gray-300">
              <p className="text-lg text-gray-700 italic">{joke.delivery}</p>
            </div>
          </div>
        )}
      </div>

      {/* Flags (if any content warnings) */}
      {joke.flags && Object.values(joke.flags).some((flag) => flag) && (
        <div className="mb-4 p-3 bg-yellow-50 rounded border border-yellow-200">
          <p className="text-xs font-semibold text-yellow-800">Content Flags:</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {Object.entries(joke.flags).map(
              ([flag, value]) =>
                value && (
                  <span key={flag} className="text-xs px-2 py-1 bg-yellow-200 text-yellow-800 rounded">
                    {flag}
                  </span>
                )
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6 flex-wrap">
        <button onClick={onNextJoke} className="btn-primary flex-1">
          😄 Get Another Joke
        </button>
        <button onClick={onAddFavorite} className="btn-secondary flex-1">
          ⭐ Add to Favorites
        </button>
        <button onClick={onCopyJoke} className="btn-secondary flex-1">
          📋 Copy
        </button>
      </div>
    </div>
  );
};

export default JokeDisplay;
