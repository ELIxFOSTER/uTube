import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewVideo } from "../../store/videos";
import { useHistory } from "react-router-dom";
import { getCurrentUserVideos } from "../../store/videos";
import { deleteVideoThunk } from "../../store/videos";
import { NavLink } from "react-router-dom";
import "./Channel.css";

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

  function getPastTime(date) {
    const secondsAgo = Math.floor((Date.now() - date.getTime()) / 1000);
    const MINUTE = 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const WEEK = DAY * 7;
    const MONTH = DAY * 30;
    const YEAR = DAY * 365;

    if (secondsAgo < MINUTE) {
      return `${secondsAgo} second${secondsAgo === 1 ? "" : "s"} ago`;
    } else if (secondsAgo < HOUR) {
      const minutesAgo = Math.floor(secondsAgo / MINUTE);
      return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
    } else if (secondsAgo < DAY) {
      const hoursAgo = Math.floor(secondsAgo / HOUR);
      return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
    } else if (secondsAgo < WEEK) {
      const daysAgo = Math.floor(secondsAgo / DAY);
      return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
    } else if (secondsAgo < MONTH) {
      const weeksAgo = Math.floor(secondsAgo / WEEK);
      return `${weeksAgo} week${weeksAgo === 1 ? "" : "s"} ago`;
    } else if (secondsAgo < YEAR) {
      const monthsAgo = Math.floor(secondsAgo / MONTH);
      return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`;
    } else {
      const yearsAgo = Math.floor(secondsAgo / YEAR);
      return `${yearsAgo} year${yearsAgo === 1 ? "" : "s"} ago`;
    }
  }

  // if (!sessionUser) return <div>Please login to view channel</div>;

  // if (!currentUserVideos.length) return <div>No videos to edit or delete</div>;

  return (
    <div id="channel-wrapper">
      <div id="sidebar-container">
        <div className='top-section-sb-container'>
          <img id='channel-sb-profile-pic' src={sessionUser?.profile_img}></img>
          <div>Your channel</div>
          <div id='channel-profile-real-name'>
            {sessionUser?.firstName} {sessionUser?.lastName}
          </div>
        </div>
        <div className='bottom-section-sb-container'>
          <div className='channel-sb-content-box'>
            <div>
              <i id='o-content-icon' className="fa-solid fa-display"></i>
            </div>
            <div id='o-content-text'>Content</div>
          </div>
        </div>
      </div>
      <div id="channel-content-main-container">
        <div id="channel-content-text">Channel Content</div>
        <div id="current-section-bar">
          <div id='videos-div-name'>Videos</div>
        </div>
        <div id="video-info-bar">
          <div>Video</div>
          <div id="video-first-section-info">
            <div>Visibility</div>
            <div>Date</div>
          </div>
          {/* <div className='video-second-section-info'>
          <div>Comments</div>
        </div> */}
        </div>
        <div id="video-content-wrapper">
          {currentUserVideos.map((video) => {
            let date = new Date(video.created_at);
            return (
              <NavLink
                to={`/video/${video.id}/edit`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div id="video-info-container">
                  <div className='vd-made-box'>
                  <img className='vd-thumbnail-preview' src={video.thumbnail} ></img>
                  <div id="video-details-container">
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: '500px'
                      }}
                    >
                      {video.title.length > 20
                        ? `${video.title.slice(0, 20)}...`
                        : video.title}
                    </div>

                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: '500px'
                      }}
                    >
                      {video.description.length > 25
                        ? `${video.description.slice(0, 25)}...`
                        : video.description}
                    </div>
                  </div>
                  </div>
                  <div className='vd-made-box-two'>
                  <div className="visi-box">
                      <i className="fa-solid fa-circle" id='live-button'></i>
                    <div style={{ fontSize: '14px'}}>Live</div>
                  </div>
                  <div className="vd-date-box">
                    <div id='channel-date-text'>{getPastTime(date)}</div>
                  </div>
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
