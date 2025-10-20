import { useEffect, useMemo, useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import moviesData from './data/movies.json';
import './App.css';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({ term: '', year: '' });
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const raw = localStorage.getItem('favorites');
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    setMovies(moviesData);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filtered = useMemo(() => {
    return movies.filter((m) => {
      const matchTitle = filters.term
        ? m.Title.toLowerCase().includes(filters.term.toLowerCase())
        : true;

      const matchYear = filters.year
        ? m.Year === filters.year
        : true;

      return matchTitle && matchYear;
    });
  }, [filters, movies]);

  function handleSearch({ term, year }) {
    setFilters({ term, year });
  }

  function toggleFavorite(movie) {
    setFavorites(prev => {
      const exists = prev.some(f => f.imdbID === movie.imdbID);
      if (exists) return prev.filter(f => f.imdbID !== movie.imdbID);
      return [...prev, movie];
    });
  }

  const isFavorite = (movie) => favorites.some(f => f.imdbID === movie.imdbID);

  return (
    <div className="container">
      <div className="container2">
        <div className="topbar">
          <h1>🎬 Catálogo de Filmes</h1>
          <div className="favs">Favoritos: <strong>{favorites.length}</strong></div>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="grid">
        {filtered.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onDetails={setSelected}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(movie)}
          />
        ))}
      </div>

      <MovieModal movie={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
