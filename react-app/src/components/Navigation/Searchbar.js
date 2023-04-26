import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../store/search";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(search(searchTerm));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search videos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
