import { useState } from 'react';
import jokeService from '../services/jokeService';

const useJoke = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jokeHistory, setJokeHistory] = useState([]);

  const fetchJoke = async (category = 'Any') => {
    try {
      setLoading(true);
      setError(null);
      const jokeData = await jokeService.getRandomJoke(category);
      setJoke(jokeData);
      setJokeHistory((prev) => [jokeData, ...prev].slice(0, 10));
    } catch (err) {
      setError(err.message);
      setJoke(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchJokeByType = async (type) => {
    try {
      setLoading(true);
      setError(null);
      const jokeData = await jokeService.getJokeByType(type);
      setJoke(jokeData);
      setJokeHistory((prev) => [jokeData, ...prev].slice(0, 10));
    } catch (err) {
      setError(err.message);
      setJoke(null);
    } finally {
      setLoading(false);
    }
  };

  const clearJoke = () => {
    setJoke(null);
    setError(null);
  };

  const clearHistory = () => {
    setJokeHistory([]);
  };

  return {
    joke,
    loading,
    error,
    jokeHistory,
    fetchJoke,
    fetchJokeByType,
    clearJoke,
    clearHistory,
  };
};

export default useJoke;
