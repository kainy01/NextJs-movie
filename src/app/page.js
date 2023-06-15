"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const [search, setSearch] = useState();
  const [nominate, setNominate] = useState();
  const [resault, setResault] = useState();
  function handleInput(event) {
    setSearch(event.target.value);
  }
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=99661966`).then((res) =>
      res.json()
    )
  );
  let searchData= data.Search
  function handleNominate(searchData){
    setNominate([...nominate, searchData])
  }
  console.log(nominate)
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <input onChange={handleInput} type="text" value={search}></input>
      <p>
        {data.Search.slice(0, 3).map((item) => (
          <p key={item.imdbID}>
            {item.Title} - {item.Year}- {item.Type}{" "}
            <button onClick={handleNominate}>Nominate</button>{" "}
          </p>
        ))}{" "}
      </p>
    </div>
  );
}
