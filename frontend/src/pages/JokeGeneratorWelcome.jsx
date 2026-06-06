import React from 'react';

const JokeGeneratorWelcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">😂 Joke Generator</h1>
          <p className="text-xl text-gray-600">Get random jokes from our API to brighten your day!</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">🎲</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Random Jokes</h3>
            <p className="text-gray-600">
              Get completely random jokes with the click of a button. No repeat jokes!
            </p>
          </div>

          <div className="card p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Filtered Search</h3>
            <p className="text-gray-600">
              Filter by category (General, Programming, Knock-Knock) and type (Single/Two-part).
            </p>
          </div>

          <div className="card p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Favorites</h3>
            <p className="text-gray-600">
              Save your favorite jokes and build your personal collection.
            </p>
          </div>

          <div className="card p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Sharing</h3>
            <p className="text-gray-600">
              Copy jokes to clipboard with one click and share them with friends.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Select Filters</h4>
              <p className="text-sm text-gray-600">Choose a category and joke type</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Joke</h4>
              <p className="text-sm text-gray-600">Click the button to fetch a random joke</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Enjoy & Share</h4>
              <p className="text-sm text-gray-600">Copy and share with friends</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3">
                4
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Save Favorite</h4>
              <p className="text-sm text-gray-600">Add to your favorites collection</p>
            </div>
          </div>
        </div>

        {/* Supported Categories */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Any', icon: '🎲' },
              { name: 'General', icon: '😄' },
              { name: 'Programming', icon: '💻' },
              { name: 'Knock-Knock', icon: '🚪' },
              { name: 'Miscellaneous', icon: '🎭' },
            ].map((cat) => (
              <div key={cat.name} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className="font-semibold text-gray-900">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="card p-6">
            <p className="text-3xl font-bold text-primary-600">10K+</p>
            <p className="text-gray-600 mt-2">Jokes Available</p>
          </div>
          <div className="card p-6">
            <p className="text-3xl font-bold text-primary-600">5</p>
            <p className="text-gray-600 mt-2">Categories</p>
          </div>
          <div className="card p-6">
            <p className="text-3xl font-bold text-primary-600">2</p>
            <p className="text-gray-600 mt-2">Joke Types</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JokeGeneratorWelcome;
