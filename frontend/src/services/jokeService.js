import api from './api';

const jokeService = {
  // Fetch joke from JokeAPI (supports multiple categories)
  getRandomJoke: async (category = 'Any') => {
    try {
      const response = await fetch(
        `https://v2.jokeapi.dev/joke/${category}?format=json`
      );
      if (!response.ok) throw new Error('Failed to fetch joke');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching joke:', error);
      throw error;
    }
  },

  // Fetch joke from specific category
  getJokeByCategory: async (category) => {
    const validCategories = ['General', 'Knock-Knock', 'Programming', 'Miscellaneous'];
    if (!validCategories.includes(category)) {
      throw new Error(`Invalid category. Use: ${validCategories.join(', ')}`);
    }
    return jokeService.getRandomJoke(category);
  },

  // Fetch multiple jokes
  getMultipleJokes: async (count = 5, category = 'Any') => {
    try {
      const jokes = [];
      for (let i = 0; i < count; i++) {
        const joke = await jokeService.getRandomJoke(category);
        jokes.push(joke);
        // Add small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      return jokes;
    } catch (error) {
      console.error('Error fetching multiple jokes:', error);
      throw error;
    }
  },

  // Get joke with specific type (single or twopart)
  getJokeByType: async (type = 'Any') => {
    try {
      const response = await fetch(
        `https://v2.jokeapi.dev/joke/Any?type=${type}`
      );
      if (!response.ok) throw new Error('Failed to fetch joke');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching joke by type:', error);
      throw error;
    }
  },

  // Save favorite joke to backend
  saveFavoriteJoke: async (jokeData) => {
    try {
      const response = await api.post('/jokes/favorites', jokeData);
      return response;
    } catch (error) {
      console.error('Error saving favorite joke:', error);
      throw error;
    }
  },

  // Get favorite jokes
  getFavoriteJokes: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/jokes/favorites?page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      console.error('Error fetching favorite jokes:', error);
      throw error;
    }
  },

  // Delete favorite joke
  deleteFavoriteJoke: async (id) => {
    try {
      const response = await api.delete(`/jokes/favorites/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting favorite joke:', error);
      throw error;
    }
  },
};

export default jokeService;
