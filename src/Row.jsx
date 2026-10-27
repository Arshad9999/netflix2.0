import React, { useEffect, useState } from 'react';
import axios from './axios';
import './Row.css';

function Row({ fetchURL, title, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    setError(false);
    axios.get(fetchURL).then(response => {
      if (active) setMovies(Array.isArray(response.data?.results) ? response.data.results.filter(Boolean) : []);
    }).catch(() => { if (active) { setMovies([]); setError(true); } });
    return () => { active = false; };
  }, [fetchURL]);
  return (
    <section className="row">
      <h2>{title}</h2>
      {error && <p role="status">This movie list is unavailable.</p>}
      <div className="row__posters">
        {movies.map(movie => {
          const image = isLargeRow ? movie.poster_path : movie.backdrop_path;
          return image ? <img key={movie.id} className={`row__poster ${isLargeRow ? 'row__posterLarge' : ''}`} src={`https://image.tmdb.org/t/p/original${image}`} alt={movie.name ?? movie.title ?? 'Movie poster'} /> : null;
        })}
      </div>
    </section>
  );
}
export default Row;
