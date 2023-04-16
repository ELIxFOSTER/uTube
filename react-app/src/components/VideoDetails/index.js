import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoDetails } from "../../store/videos";
import { getVideoComments } from "../../store/comments";
import { clearVideo } from "../../store/videos";
import { getAllVideos } from "../../store/videos";
import { NavLink } from "react-router-dom";
import {
  createNewComment,
  editComment,
  deleteComment,
} from "../../store/comments";
import CommDotMenu from "../CommDotMenu";
import LoginFormModal from "../LoginFormModal";
import "./VideoDetails.css";
import { getAllUsers } from "../../store/session";
import { getUserById } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function VideoDetails() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const videoDetails = useSelector((state) => state.videos.VideoDetails);
  const commentsState = useSelector((state) => state.comments);
  const comments = Object.values(commentsState.VideoComments);
  const sessionUser = useSelector((state) => state.session.user);
  const videoUser = useSelector((state) => state.session.VideoUser);
  const allVideos = useSelector((state) => state.videos);
  const videos = Object.values(allVideos.AllVideos);
  const ulRef = useRef();
  const history = useHistory()

  const [errors, setErrors] = useState([]);
  const [comment_text, setComment] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    dispatch(clearVideo());
    dispatch(getAllUsers());
    dispatch(getAllVideos());
    dispatch(getVideoDetails(videoId));
    dispatch(getVideoComments(videoId));
  }, [dispatch, videoId]);

  useEffect(() => {
    if (videoDetails.user_id) {
      dispatch(getUserById(videoDetails.user_id));
    }
  }, [dispatch, videoDetails.user_id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      createNewComment({ comment_text, video_id: videoId })
    );
    if (response && response.errors) {
      setErrors(response.errors);
    }
    setComment("");
  };

  const handleEdit = (comment) => {
    setEditCommentId(comment?.id);
    setShowEdit(true);
    setEditText(comment?.comment_text);
  };

  const handleDelete = async (comment) => {
    const response = await dispatch(deleteComment(comment?.id));
    if (response && response.errors) {
      setErrors(response.errors);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      editComment({ id: editCommentId, comment_text: editText })
    );
    if (response && response.errors) {
      setErrors(response.errors);
    } else {
      setShowEdit(false);
      setEditText("");
      setEditCommentId(null);
    }
  };

  const ulClassName = "comment-menu-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const allUsers = useSelector((state) => state.session);
  console.log("allUsers", allUsers);

  const videoDate = new Date(videoDetails?.created_at)

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


  const playNext = () => {
    history.push(`/video/${videos[videoDetails.id].id}`)
    console.log('this', videos[videoDetails.id + 1].id)
  }


  if (!Object.values(videoDetails).length) return null;
  // if (!Object.values(videoUser).length) return null

  return (
    <div className="video-details-wrapper">
      <div className="video-details-content-container">
        <div>
        <video width="1280px" height="720px" autoPlay controls onEnded={playNext}>
          <source src={videoDetails?.url} />
        </video>
        </div>
        <div className='vd-nonvideo-wrapper'>
        <div className="video-details-title-box" style={{ fontWeight: '600'}}>{videoDetails.title}</div>
        <div className="vd-profile-bar">
          <img id="video-user-profile-image" src={videoUser?.profile_img}></img>
          <div className="profile-bar-right-section">
            <div style={{ fontSize: '17px', fontWeight: '600' }}>{videoUser?.username}</div>
            <div><i className="fa-solid fa-circle-check" style={{ fontSize: '13px'}}></i></div>
          </div>
          <div className='sub-button-box'>
          <button id='vd-sub-button'>Subscribe</button>
          </div>
        </div>
        <div className="video-description-container">
          <div style={{ fontWeight: '500' }}>{getPastTime(videoDate)}</div>
          <div style={{ fontSize: '13px', fontWeight: '400' }}>{videoDetails.description}</div>
        </div>
        <div className="comment-section-title">
          <div style={{ fontWeight: '600'}}>Comments</div>
        </div>
        <form onSubmit={handleCommentSubmit} encType="multipart/form-data">
          {sessionUser ? (
                      <div className="comment-input-wrapper">
                      <div>
                        <img
                          id="comment-user-profile-image"
                          src={sessionUser?.profile_img}
                        ></img>
                      </div>
                      <div className="comment-input-container">
                        <input
                          type="text"
                          placeholder="Add a comment"
                          value={comment_text}
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                          className="comment-input-field"
                          required
                        />
                        <div className='comment-send-btn-box'>
                        <button type="submit" className="comment-send-btn" name="Submit">
                          {/* {" "} */}
                          Comment
                        </button>
                        </div>
                      </div>
                    </div>
          ) : (
            <div></div>
          )}
          {errors.length > 0 && (
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          )}
        </form>
        <div className="comment-section-container">
          {comments.length > 0 ? (
            comments.map((comment) => {
              let commentDate = new Date(comment?.created_at)
              let commentUser = null;
              if (allUsers && allUsers.users && allUsers.users.users) {
                commentUser = allUsers.users.users.find(
                  (user) => user.id === comment?.user_id
                );
              }

              return (
                <div key={comment?.id}>
                  {editCommentId === comment?.id ? (
                    <form onSubmit={handleEditSubmit}>
                      <input
                        type="text"
                        placeholder="Edit your comment"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button type="submit">Save</button>
                    </form>
                  ) : (
                    <div className="cp-section-container">
                      {/* <div>ProfilePic</div> */}
                      <img
                        id="vd-profile-image"
                        src={commentUser?.profile_img}
                      ></img>
                      <div className="cp-section-one">
                        <div className="cp-section-two">
                          <div className="cp-title-section">
                            <div style={{ fontWeight: '600'}}>@{commentUser?.username}</div>
                            <div id='comment-timestamp'>{getPastTime(commentDate)}</div>
                          </div>
                          {comment?.user_id === sessionUser?.id && (
                            <div>
                              <button id='comment-drop-menu-button'onClick={() => setShowMenu(comment?.id)}>
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                              </button>
                              {showMenu === comment?.id && (
                                <div className={ulClassName} ref={ulRef}>
                                  <div id='cm-edit-box' onClick={() => handleEdit(comment)}>
                                    <div><i className="fa-regular fa-pen-to-square"></i></div>
                                    <div id='cm-edit-btn'>Edit</div>
                                  </div>
                                  <div id='cm-delete-box' onClick={() => handleDelete(comment)}>
                                    <div><i className="fa-regular fa-trash-can"></i></div>
                                    <div id='cm-delete-btn'>Delete</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div style={{ fontWeight: '400'}}>{comment?.comment_text}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
        </div>
      </div>
      <div className='vd-sidebar-wrapper'>
        {videos.map((video) => {
          let videoUser = null;
          let videoDate = new Date(video.created_at)
          if (allUsers && allUsers.users && allUsers.users.users) {
            videoUser = allUsers.users.users.find(
              (user) => user.id === video.user_id
            );
          }
          return (
            <NavLink to={`/video/${video.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className='vd-sidebar-card'>
              <div>
              <img id="vd-sidebar-thumbnail" src={video?.thumbnail}></img>
              </div>
              <div className='vd-card-details'>
                <div>{video?.title}</div>
                <div className='vd-name-check'>
                  <div className='vd-username-card'>{videoUser?.username}</div>
                  <i className="fa-solid fa-circle-check" id='vd-verified-icon'></i>
                </div>
                <div className='vd-past-time'>{getPastTime(videoDate)}</div>
              </div>
            </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
