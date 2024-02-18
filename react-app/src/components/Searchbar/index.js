

import React, { useState } from 'react';

const Searchbar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search"
                />
                <button type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>

            {results && (
                <div>
                    <h2>Search Results</h2>
                    <div>
                        <h3>Users</h3>
                        <ul>
                            {results.users.map((user, index) => (
                                <li key={index}>{user.username}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3>Videos</h3>
                        <ul>
                            {results.videos.map((video, index) => (
                                <li key={index}>
                                    {video.video_title} by {video.username}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Searchbar;
