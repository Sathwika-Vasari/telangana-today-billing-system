import React, { useState } from 'react';

const JokeFilters = ({ onCategoryChange, onTypeChange, onFetch }) => {
  const [selectedCategory, setSelectedCategory] = useState('Any');
  const [selectedType, setSelectedType] = useState('Any');

  const categories = ['Any', 'General', 'Knock-Knock', 'Programming', 'Miscellaneous'];
  const types = ['Any', 'single', 'twopart'];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onTypeChange(type);
  };

  const handleFetch = () => {
    onFetch(selectedCategory, selectedType);
  };

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Joke Filters</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-4 h-4 text-primary-600"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Joke Type
          </label>
          <div className="space-y-2">
            {types.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={selectedType === type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className="w-4 h-4 text-primary-600"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {type === 'Any' ? 'Any Type' : type === 'single' ? 'Single Liner' : 'Two Part'}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleFetch} className="btn-primary w-full mt-6">
        🎲 Get Joke
      </button>
    </div>
  );
};

export default JokeFilters;
