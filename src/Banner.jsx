import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from './axios';
import requests from './requests.js';

function Banner() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    axios.get(requests.fetchNetflixOriginals).then(response => {
      if (!active) return;
      const results = Array.isArray(response.data?.results) ? response.data.results : [];
      setMovie(results.length ? results[Math.floor(Math.random() * results.length)] : null);
    }).catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, []);
  const overview = movie?.overview ?? '';
  return (
    <header className="banner" style={{ backgroundSize: 'cover', backgroundPosition: 'center center', ...(movie?.backdrop_path ? { backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")` } : {}) }}>
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.original_name ?? movie?.title ?? 'Movie catalog'}</h1>
        {error && <p role="status">Movie catalog is unavailable. Check the demo configuration and connection.</p>}
        <div className="banner__buttons">
          <button className="banner__button" disabled title="Playback is not implemented">Play</button>
          <button className="banner__button" disabled title="Saved lists are not implemented">My List</button>
        </div>
        <p className="banner__description">{overview.length > 150 ? overview.slice(0, 149) + '...' : overview}</p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}
export default Banner;
