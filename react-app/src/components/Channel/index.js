import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewVideo } from "../../store/videos";
import { useHistory } from "react-router-dom";
import { getCurrentUserVideos } from "../../store/videos";
import { deleteVideoThunk } from "../../store/videos";
import { NavLink } from "react-router-dom";
import './Channel.css'

export default function Channel() {
  const dispatch = useDispatch();
  const videoSelector = useSelector((state) => state.videos);
  const currentUserVideos = Object.values(videoSelector.UserVideos);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getCurrentUserVideos());
  }, [dispatch]);

  const handleClick = async (videoId, e) => {
    e.preventDefault();
    await dispatch(deleteVideoThunk(videoId));
  };

  if (!sessionUser) return <div>Please login to view channel</div>;

  if (!currentUserVideos.length) return <div>No videos to edit or delete</div>;

  return (
    <div id='channel-wrapper'>
      <div id='sidebar-container'>SIDEBAR CONTAINER</div>
      <div id='channel-content-main-container'>
        <div id='channel-content-text'>Channel Content</div>
      <div id='current-section-bar'>
        <div>Videos</div>
      </div>
      <div id='video-info-bar'>
        <div>Video</div>
        <div id='video-first-section-info'>
          <div>Visibility</div>
          <div>Restrictions</div>
          <div>Date</div>
        </div>
        {/* <div className='video-second-section-info'>
          <div>Comments</div>
        </div> */}
      </div>
      <div id='video-content-wrapper'>
        {currentUserVideos.map((video) => {
            return (
                <NavLink
                to={`/video/${video.id}/edit`}
                style={{ textDecoration: "none", color: "inherit" }}
                >
                <div id='video-info-container'>
                    <div>Thumbnail Image Here</div>
                    <div id='video-details-container'>
                        <div>{video.title}</div>
                        <div>{video.description}</div>
                    </div>
                </div>
              </NavLink>
          );
        })}
      </div>
        </div>
    </div>
  );
}
