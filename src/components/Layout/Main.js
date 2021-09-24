import React, { useState, useEffect, useCallback, Fragment } from "react";
import MoviesList from "../Movies/MoviesList";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Modal/Button/Button";

import magnifyingGlass from "../../assets/magnifying_glass.jpg";
import classes from "./Main.module.css";

function Main() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filteredMovies, setFilteredMovies] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const [showSortOptions, setShowSortOptions] = useState(false);

  //Fetch Movies
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://star-wars-api.herokuapp.com/films");

      if (!response.ok) {
        throw new Error("Something went wrong!");
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

  //Sort Movies
  const sortByEpisodeHandler = () => {
    setFilteredMovies(
      movies.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
    );
  };

  //Modal Actions
  const showSortOptionsHandler = () => {
    setShowSortOptions(true);
  };

  const hideSortOptionsHandler = () => {
    setShowSortOptions(false);
  };

  //Show content
  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = (
      <Fragment>
        <div className={classes['movie-actions']}>
          <div className={classes['movie-actions__container']}>
            <Button  className={classes['movie-actions__container-btn']} onClick={showSortOptionsHandler}>Sort by...</Button>
            {showSortOptions && (
              <Modal>
                <p className={classes['modal-container__title']}>Sort by</p>
                <span className={classes['modal-container__cancel']} onClick={hideSortOptionsHandler}>x</span>
                <ul>
                  <li>
                    <Button className={classes['modal-container__sort-btn']} onClick={sortByEpisodeHandler}>Sort by episode</Button>
                  </li>
                </ul>
              </Modal>
            )}
          </div>
          <div className={classes.search}>
            <img src={magnifyingGlass} alt="magnifying-Glass" />
            <input
              className={classes["search-input"]}
              type="search"
              placeholder="Type to search..."
              onChange={searchChangeHandler}
            />
          </div>
        </div>
        <MoviesList movies={filteredMovies} />
      </Fragment>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return <section className={classes["movies-container"]}>{content}</section>;
}

export default Main;
