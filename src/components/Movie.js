import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const movieDetailshandler = () => {
    const movieDetails = {
      title: props.title,
      openingText: props.openingText,
      producer: props.producer,
    };

    props.onGetMovieDetails(movieDetails);
  };

  return (
    <li className={classes.movie} onClick={movieDetailshandler}>
      <p className={classes.episode}>EPISODE<span>{props.id}</span></p>
      <p className={classes.title}>{props.title}</p>
      <p className={classes.date}>{props.releaseDate}</p>
    </li>
  );
};

export default Movie;
