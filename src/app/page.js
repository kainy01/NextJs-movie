"use client";

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const App = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nominate, setNominate] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (search.trim() !== "") {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${search}&apikey=99661966`
        );
        const data = await response.json();
        setSearchResults(
          data.Response === "True" ? data.Search.slice(0, 3) : []
        );
      } else {
        setSearchResults([]);
      }
    };

    fetchMovies();
  }, [search]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleNominate = (item) => {
    setNominate([...nominate, item]);
  };

  function handleDelete(item) {
    setNominate(nominate.filter((movie) => movie.imdbID !== item));
  }

  return (
    <>
      <div className="container p-lg-5">
        <h1 className="my-4 fw-bold col-lg-6 col-12">
          Search below to nominate your top 5 favorite movies & series.
        </h1>
        <div className="row">
          <div className="col-lg-6 col-12">
            <div className="mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control shadow-none border-none"
                  value={search}
                  onChange={handleInputChange}
                />
                <span className="input-group-text searchIcon">
                  <FaSearch />
                </span>
              </div>
              <h6 className="mt-3 ms-2">Search results:</h6>
              <ul className="list-group list-group-flush ms-1">
                {searchResults.length > 0 && search.trim() !== "" ? (
                  searchResults.map((item) => (
                    <li
                      class="list-group-item list-group-item-action list-group-item-primary bg-transparent d-flex justify-content-between align-items-center"
                      key={item.imdbID}
                    >
                      <div className="mt-1">
                        <h5 className="text-info">{item.Title} </h5>
                        <p>
                          {item.Type} &#x2022; {item.Year}
                        </p>
                      </div>
                      <div>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleNominate(item)}
                          disabled={nominate.some(
                            (movie) =>
                              movie.imdbID === item.imdbID ||
                              nominate.length > 4
                          )}
                        >
                          Nominate
                        </button>
                      </div>
                    </li>
                  ))
                ) : search.trim() !== "" ? (
                  <h5 className="text-center text-danger fw-bold">
                    No movies found.
                  </h5>
                ) : null}
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-12 ">
            <h2 className="text-center fw-bold">
              Nominated Movies {nominate.length}/5
            </h2>
            <ul className="list-group list-group-flush ms-1 mt-2">
              {nominate.map((item) => (
                <li
                  class="list-group-item list-group-item-action list-group-item-primary bg-transparent d-flex justify-content-between align-items-center"
                  key={item.imdbID}
                >
                  <div className="mt-1">
                    <div className="row d-flex justify-content-start align-items-center">
                      <div className="col-4 img-container ">
                        <img
                          src={item.Poster}
                          alt={item.Title}
                        width={50}
                        height={70}
                        />
                      </div>
                      <div className="col-8">
                        <h5 className="text-danger">{item.Title} </h5>
                        <p>
                          {item.Type} &#x2022; {item.Year}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.imdbID)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
