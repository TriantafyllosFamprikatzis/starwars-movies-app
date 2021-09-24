import React, { useState } from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  const defaultValue =
    {
      defaultTitle: "No movie selected",
    };

  const [movieDetails, setMovieDetails] = useState(defaultValue);

  const getMovieDetailsHandler = (detail) => {
    setMovieDetails(() => {
      const updatedDetails = detail;
      return updatedDetails;
    });
  };

  let content = (
    <div className={classes["default-movie-details"]}>
      <p className={classes['default-title']}>{movieDetails.defaultTitle}</p>
    </div>
  );

  if (Object.keys(movieDetails).length > 1) {
    content = (
      <div className={classes["movie-details"]}>
        <p className={classes['details-title']}>{movieDetails.title}</p>
        <p className={classes['details-text']}>{movieDetails.openingText}</p>
        <p className={classes['details-text']}>{movieDetails.producer}</p>
      </div>
    );
  }

  return (
    <div className={classes["movies-container"]}>
      <ul className={classes['movies-list']}>
        {props.movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.releaseDate}
            openingText={movie.openingText}
            producer={movie.producer}
            onGetMovieDetails={getMovieDetailsHandler}
          />
        ))}
      </ul>
      {content}
    </div>
  );
};

export default MovieList;
