import React from 'react';

const JokeHistory = ({ history, onSelectJoke, onClearHistory }) => {
  if (!history || history.length === 0) {
    return (
      <div className="card p-6 text-center text-gray-500">
        <p>No joke history yet. Get some jokes to build history!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Recent Jokes ({history.length})</h2>
        <button onClick={onClearHistory} className="btn-danger text-xs">
          Clear History
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {history.map((joke, index) => (
          <div
            key={index}
            onClick={() => onSelectJoke(joke)}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {joke.type === 'single'
                    ? joke.joke.substring(0, 60) + '...'
                    : joke.setup.substring(0, 60) + '...'}
                </p>
                <p className="text-xs text-gray-500 mt-1">{joke.category}</p>
              </div>
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded ml-2">
                {joke.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JokeHistory;
