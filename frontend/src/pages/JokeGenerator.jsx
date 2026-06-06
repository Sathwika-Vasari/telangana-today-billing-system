import React, { useState } from 'react';
import useJoke from '../hooks/useJoke';
import JokeDisplay from '../components/JokeDisplay';
import JokeFilters from '../components/JokeFilters';
import JokeHistory from '../components/JokeHistory';
import jokeService from '../services/jokeService';
import useAlert from '../hooks/useAlert';

const JokeGenerator = () => {
  const { joke, loading, error, jokeHistory, fetchJoke, fetchJokeByType, clearJoke, clearHistory } = useJoke();
  const { success } = useAlert();
  const [selectedCategory, setSelectedCategory] = useState('Any');
  const [selectedType, setSelectedType] = useState('Any');
  const [showHistory, setShowHistory] = useState(false);

  const handleFetch = (category, type) => {
    setSelectedCategory(category);
    setSelectedType(type);

    if (type === 'Any') {
      fetchJoke(category);
    } else {
      fetchJokeByType(type);
    }
  };

  const handleAddFavorite = async () => {
    if (!joke) return;

    try {
      const jokeData = {
        category: joke.category,
        type: joke.type,
        joke_text: joke.joke || null,
        setup: joke.setup || null,
        delivery: joke.delivery || null,
      };

      await jokeService.saveFavoriteJoke(jokeData);
      success('Joke added to favorites! ⭐');
    } catch (err) {
      console.error('Error saving favorite:', err);
    }
  };

  const handleCopyJoke = () => {
    if (!joke) return;

    const jokeText = joke.type === 'single'
      ? joke.joke
      : `${joke.setup}\n${joke.delivery}`;

    navigator.clipboard.writeText(jokeText);
    success('Joke copied to clipboard! 📋');
  };

  const handleSelectFromHistory = (selectedJoke) => {
    // Note: This updates the display, actual state management depends on your implementation
    console.log('Selected joke from history:', selectedJoke);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">😂 Random Joke Generator</h1>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="btn-secondary"
        >
          {showHistory ? 'Hide' : 'Show'} History
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <JokeFilters
            onCategoryChange={setSelectedCategory}
            onTypeChange={setSelectedType}
            onFetch={handleFetch}
          />

          {/* Joke Display */}
          <JokeDisplay
            joke={joke}
            loading={loading}
            error={error}
            onNextJoke={() => handleFetch(selectedCategory, selectedType)}
            onAddFavorite={handleAddFavorite}
            onCopyJoke={handleCopyJoke}
          />
        </div>

        {/* Sidebar - History */}
        {showHistory && (
          <div className="lg:col-span-1">
            <JokeHistory
              history={jokeHistory}
              onSelectJoke={handleSelectFromHistory}
              onClearHistory={clearHistory}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JokeGenerator;
