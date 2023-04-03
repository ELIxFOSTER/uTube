import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllVideos } from "../../store/videos";
import { getAllUsers } from "../../store/session";
import "./VideosAll.css";

export default function VideosAll() {
  const dispatch = useDispatch();
  const allVideos = useSelector((state) => state.videos);
  const allUsers = useSelector((state) => state.session);
  const videos = Object.values(allVideos.AllVideos);
  const sessionUser = useSelector((state) => state.session.user)
  console.log("---videos---", allVideos);
  //   console.log("---users---", allUsers.users);

  useEffect(() => {
    dispatch(getAllVideos());
    dispatch(getAllUsers());
  }, [dispatch]);


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

  // const date = new Date("Sun, 02 Apr 2023 09:17:51 GMT");
  // console.log(getTimeAgo(date)); // outputs "2 years ago"

  if (!videos.length) return null;

  return (
    <div className="all-videos-wrapper">
      <div className="sidebar-wrapper">
        <NavLink to='/' style={{ textDecoration: "none", color: "inherit" }} >
        <div className='sb-home-box'>
          <div>
            <i className="fa-solid fa-house" style={{ fontSize: '20px'}}></i>
          </div>
          <div>Home</div>
        </div>
        </NavLink>
        <div id='sb-line'></div>
          {sessionUser ? (
              <NavLink to='/channel' style={{ textDecoration: "none", color: "inherit" }}>
              <div className='sb-videos-box'>
                <div>
                  <i className="fa-solid fa-film" style={{ fontSize: '20px'}}></i>
                </div>
                <div style={{ fontWeight: '300', fontSize: '14px'}}>Your videos</div>
              </div>
              </NavLink>
          ) : (
            <div className='sb-videos-box-dead'>
            <div>
              <i className="fa-solid fa-film" style={{ fontSize: '20px'}}></i>
            </div>
            <div style={{ fontWeight: '300', fontSize: '14px'}}>Your videos</div>
          </div>
          )}
        <div className='sb-socials-box'>
          <div style={{ paddingLeft: '15px', paddingTop: '15px'}}>Socials</div>
          <div className='sb-socials-container'>
            <NavLink to={{ pathname: "https://github.com/ELIxFOSTER" }} style={{ textDecoration: "none", color: "inherit" }} target="_blank" rel="noreferrer">
          <div className='sb-github-box'>
            <div>
              <i className="fa-brands fa-github" style={{ fontSize: '20px'}}></i>
            </div>
            <div style={{ fontWeight: '300', fontSize: '14px'}}>Github</div>
          </div>
            </NavLink>
          <NavLink to={{ pathname: "https://www.linkedin.com/in/eli-foster-4394aa246/" }} style={{ textDecoration: "none", color: "inherit" }} target="_blank" rel="noreferrer">
          <div className='sb-linkedin-box'>
            <div>
            <i className="fa-brands fa-linkedin" style={{ fontSize: '20px'}}></i>
            </div>
            <div style={{ fontWeight: '300', fontSize: '14px'}}>Linkedin</div>
          </div>
          </NavLink>
          <NavLink to={{ pathname: "https://twitter.com/elixfinesse" }} style={{ textDecoration: "none", color: "inherit" }} target="_blank" rel="noreferrer">
          <div className='sb-twitter-box'>
            <div><i className="fa-brands fa-square-twitter" style={{ fontSize: '20px'}}></i></div>
            <div style={{ fontWeight: '300', fontSize: '14px'}}>Twitter</div>
          </div>
          </NavLink>
          </div>
        </div>
      </div>

      <div className="all-videos-section-container">
        {videos.sort(() => Math.random() - 0.5).map((video) => {
          // const videoUser = allUsers?.users?.users?.find(
          //   (user) => user.id === video.user_id
          // );
          let videoUser = null;
          const date = new Date(video.created_at)
          if (allUsers && allUsers.users && allUsers.users.users) {
            videoUser = allUsers.users.users.find(
              (user) => user.id === video.user_id
            );
          }
          return (
            <NavLink
              to={`/video/${video.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="video-card">
                <div>
                  <img id="thumbnail-img" src={video.thumbnail}></img>
                </div>
                <div className="sub-container">
                  {videoUser && (
                    <img
                      id="profile-pic-video"
                      src={videoUser.profile_img}
                    ></img>
                  )}
                  <div className="video-details-container">
                    <div id='db-card-title'>{video.title}</div>
                    <div className='video-details-two-container'>
                      <div id='username-verified-box'>
                    <div id='db-card-username'>{videoUser?.username}</div>
                    <div><i id='verified' className="fa-solid fa-circle-check"></i></div>
                      </div>
                    <div id='db-card-date'>{getPastTime(date)}</div>
                    </div>
                  </div>
                </div>
                {/* <div>{video.url}</div>
            <div>{video.thumbnail_img}</div>
            <div>{video.created_at}</div>
            <div>{video.updated_at}</div> */}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
