"use client";

import React, { useState, useEffect } from "react";

const YourComponent = () => {
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
      <div>
        <input type="text" value={search} onChange={handleInputChange} />
        <p>Search results:</p>
        {searchResults.length > 0 && search.trim() !== ""
          ? searchResults.map((item) => (
              <p key={item.imdbID}>
                {item.Title}{" "}
                <button
                  onClick={() => handleNominate(item)}
                  disabled={nominate.some(
                    (movie) =>
                      movie.imdbID === item.imdbID || nominate.length > 4
                  )}
                >
                  Nominate
                </button>
              </p>
            ))
          : search.trim() !== "" && <p>No movies found.</p>}
      </div>
      <div>
        <h2>Nominated Movies</h2>
        {nominate.map((item) => (
          <p key={item.imdbID}>
            {item.Title}{" "}
            <button onClick={() => handleDelete(item.imdbID)}>Remove</button>
          </p>
        ))}
      </div>
    </>
  );
};

export default YourComponent;
