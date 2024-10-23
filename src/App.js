// App.js
import React, { useState, useEffect, useCallback } from 'react';
import './styles.css'; // Optional: for styling

const App = () => {
  const [movies, setMovies] = useState([]); // State to store movie data
  const [searchTerm, setSearchTerm] = useState('Batman'); // Default search term
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Function to fetch movie data from OMDb API, memoized using useCallback
  const fetchMovies = useCallback(async () => {
    setLoading(true); // Show loading indicator before fetching data
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=5f323b13`
      );
      const data = await response.json(); // Parse the response as JSON
      setMovies(data.Search || []); // Store the movie data in state
    } catch (error) {
      console.error('Error fetching movies:', error); // Handle errors
    }
    setLoading(false); // Hide loading indicator once the data is fetched
  }, [searchTerm]);

  // Fetch movie data when the component mounts or when the search term changes
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="app">
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button onClick={fetchMovies} className="search-btn">Search</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie">
              <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
              <p>{movie.Title} ({movie.Year})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
