import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MoviesList from "../Movies/MoviesList";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import { uiActions } from "../../store/ui-slice";

import magnifyingGlass from "../../assets/magnifying_glass.jpg";
import classes from "./Main.module.css";

function Main() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.ui.modalIsVisible);

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchTerm, setSearchTerm] = useState("");

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
      movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, movies]);

  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  //Sort Movies
  const sortByEpisodeHandler = () => {
    setMovies(movies.slice().sort((a, b) => parseFloat(a.id) - parseFloat(b.id)));
  };

  const sortByYearHandler = () => {
    setMovies(movies.slice().sort((a, b) => parseFloat(a.releaseDate) - parseFloat(b.releaseDate)));
  };

  //Modal Actions
  const showSortOptionsHandler = () => {
    dispatch(uiActions.open());
  };

  const hideSortOptionsHandler = () => {
    dispatch(uiActions.close());
  };

  //Show content
  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = (
      <Fragment>
        <div className={classes["movie-actions"]}>
          <div className={classes["movie-actions__container"]}>
            <Button
              className={classes["movie-actions__container-btn"]}
              onClick={showSortOptionsHandler}
            >
              Sort by...
            </Button>
            {showModal && (
              <Modal>
                <p className={classes["modal-container__title"]}>Sort by</p>
                <span
                  className={classes["modal-container__cancel"]}
                  onClick={hideSortOptionsHandler}
                >
                  x
                </span>
                <ul>
                  <li>
                    <Button
                      className={classes["modal-container__sort-btn"]}
                      onClick={sortByEpisodeHandler}
                    >
                      Sort by episode
                    </Button>
                    <Button
                      className={classes["modal-container__sort-btn"]}
                      onClick={sortByYearHandler}
                    >
                      Sort by Year
                    </Button>
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
    content = <p className={classes.error}>{error}</p>;
  }

  if (isLoading) {
    content = <p className={classes.error}>Loading...</p>;
  }

  return <section className={classes["movies-container"]}>{content}</section>;
}

export default Main;