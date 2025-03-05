import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL; // ✅ Uses environment variable



function App() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: "", year: "", genre: "" });
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch movies from backend
  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/movies/`);
      setMovies(response.data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Search movies by title
  const searchMovies = async () => {
    try {
      if (searchQuery.trim() === "") {
        fetchMovies(); // If empty, show all movies
      } else {
        const response = await axios.get(`${API_URL}/search-movies/`, {
          params: { title: searchQuery },
        });
        setMovies(response.data.movies);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  // Add a new movie
  const addMovie = async () => {
    try {
      await axios.post(`${API_URL}/add-movie/`, newMovie);
      setNewMovie({ title: "", year: "", genre: "" }); // Clear form
      fetchMovies(); // Refresh movie list
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎬 Movie Search App</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={searchMovies}>Search</button>

      {/* Movie Input Form */}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Year"
          value={newMovie.year}
          onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
        />
        <button onClick={addMovie}>Add Movie</button>
      </div>

      {/* Movie List */}
      <h2>📜 Movie List</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <strong>{movie.title}</strong> ({movie.year}) - {movie.genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


