import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './MoviesList';

import magnifyingGlass from "../assets/magnifying_glass.jpg";
import classes from "./Main.module.css";

function Main() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchTerm, setSearchTerm] = useState('');

  //Fetch Movies
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://star-wars-api.herokuapp.com/films');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const transformedMovies = data.map((movieData) => {
        return {
          id: movieData.fields.episode_id,
          title: movieData.fields.title,
          openingText: movieData.fields.opening_crawl,
          releaseDate: movieData.fields.release_date,
          producer: movieData.fields.producer,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);


  //Filter Movies
  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm))
    );
  }, [searchTerm, movies]);

  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };


  //Show content
  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = (
      <React.Fragment>
        <div className={classes.search}>
          <img src={magnifyingGlass} alt="magnifying-Glass"/>
          <input className={classes['search-input']} type='search' placeholder="Type to search..." onChange={searchChangeHandler} />
        </div>
        <MoviesList movies={filteredMovies} />
      </React.Fragment>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <section className={classes['movies-container']}>{content}</section>
  );
}

export default Main;