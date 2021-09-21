import React, { useState } from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const [detailsShown, setDetailsShown] = useState(false);

  const movieDetailsToggle = () => {
    setDetailsShown((prevDetailsShown) => !prevDetailsShown);
  };

  return (
    <div className={classes["movies-container"]} onClick={movieDetailsToggle}>
      <li className={classes.movie}>
        <p>{props.id}</p>
        <p>{props.title}</p>
        <p>{props.releaseDate}</p>
      </li>

      {detailsShown && (
        <li className={classes["movie-details"]}>
          <h2>{props.title}</h2>
          <p>{props.openingText}</p>
          <p>{props.producer}</p>
        </li>
      )}

      {!detailsShown && (
        <p>No Movie Selected</p>
      )}
    </div>
  );
};

export default Movie;
