import React from "react";
import { withRouter } from "react-router-dom";

const SearchResults = (props) => {
  const results = props.location.state?.results;

  if (!results || !results.users || !results.videos) {
    // Check if results, users, or videos are not defined
    return null; // You may also display an error message or loading spinner here
  }

  return (
    <div>
      <h2>Search Results</h2>
      <div>
        <h3>Users</h3>
        <ul>
          {results.users.map((user, index) => (
            <div key={index}>
              <img width="50px" src={user.profile_img}></img>
              <h1>{user.username}</h1>
            </div>
          ))}
        </ul>
      </div>

      <div>
        <h3>Videos</h3>
        <ul>
          {results.videos.map((video, index) => (
            <div key={index}>
              {video.video_title} by {video.username}
              <img width="50px" src={video.thumbnail}></img>
            </div>

          ))}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(SearchResults);
