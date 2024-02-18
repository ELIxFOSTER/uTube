import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import "./Searchbar.css";
import SearchResults from "../SearchResults";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const history = useHistory();

  const handleInputChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery.trim() === '') {
      // If the input field is empty, reset suggestions to null
      setSuggestions(null);
      return;
  }

    // Fetch search suggestions based on the partial query
    try {
      const response = await fetch(
        `/api/search/suggestions?query=${encodeURIComponent(newQuery)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching search suggestions:", error.message);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResults(data);
      console.log("results", data);
      history.push("/results", { results: data });
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    }
  };

  const handleSuggestionClick = async (value) => {
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(value)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResults(data);
      console.log("results", data);
      history.push("/results", { results: data });
    } catch (error) {
      console.error("Error fetching search results:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="searchbar-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search"
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
      {suggestions && (
        <div className="suggestions-container">
          <h3>Search Suggestions</h3>
          <ul>
            {suggestions.video_titles.map((video, index) => (
              <div key={index} onClick={() => handleSuggestionClick(video.title)}>
                {video.title}

              </div>
            ))}
            {suggestions.usernames.map((user, index) => (
              <div key={index}>{user.username}</div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
