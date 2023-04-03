import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editVideoThunk } from "../../store/videos";
import { getVideoDetails } from "../../store/videos";
import { clearVideo } from "../../store/videos";
import { NavLink } from "react-router-dom";
import { deleteVideoThunk } from "../../store/videos";
import "./VideoEdit.css";

export default function VideoEdit() {
  const dispatch = useDispatch();
  const { videoId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);
  const video = useSelector((state) => state.videos.VideoDetails);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(video.thumbnail);
  const [errors, setErrors] = useState([]);
  //   const [thumbnail, setThumbnail] = useState(video.thumbnail);
  const url = video.url;
  console.log("video test", video.url);

  useEffect(() => {
    dispatch(clearVideo);
    dispatch(getVideoDetails(videoId));
    setTitle(video.title);
    setCategory(video.category);
    setDescription(video.description);
    setThumbnail(video.thumbnail);
  }, [
    dispatch,
    videoId,
    video.title,
    video.category,
    video.description,
    video.thumbnail,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const user_id = sessionUser.id;

    console.log("here", thumbnail);

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("thumbnail", thumbnail);
    formData.append("url", url);
    formData.append("user_id", user_id);

    const jsonData = JSON.stringify(Object.fromEntries(formData));

    const data = await dispatch(editVideoThunk(jsonData, videoId));

    if (data) {
      setErrors(data);
    } else {
      console.log("hit");
      setTitle("");
      setCategory("");
      setDescription("");
      setThumbnail(null);
      history.push("/channel");
    }

    // let videoData = {
    //   title,
    //   category,
    //   description,
    //   user_id,
    //   url,
    //   thumbnail,
    // };

    // console.log("videoData", videoData);

    // const data = await dispatch(editVideoThunk(videoData, videoId));
    // if (data) {
    //   setErrors(data);
    // } else {
    //   setTitle("");
    //   setCategory("");
    //   setDescription("");
    //   history.push("/channel");
    // }
  };

  // return (
  //   <>
  //     <h1>Edit Video Route</h1>
  // <form onSubmit={handleSubmit} encType='multipart/form-data'>
  // <ul>
  // 		{errors.map((error, idx) => (
  // 			<li key={idx}>{error}</li>
  // 		))}
  // 	</ul>
  //   <input
  //     type="text"
  //     value={title}
  //     onChange={(e) => setTitle(e.target.value)}
  //     placeholder="Title"
  //     required
  //   />
  //   <input
  //     type="text"
  //     value={category}
  //     onChange={(e) => setCategory(e.target.value)}
  //     placeholder="Category"
  //     required
  //   />
  //   <input
  //     type="textarea"
  //     value={description}
  //     onChange={(e) => setDescription(e.target.value)}
  //     placeholder="Description"
  //     required
  //   />
  //   <button>Submit</button>
  // </form>
  //   </>
  // );

  const handleSaveClick = (e) => {
    handleSubmit(e);
  };

  const handleDeleteClick = async (videoId, e) => {
    e.preventDefault();
    await dispatch(deleteVideoThunk(videoId));
    history.push('/channel')
  };
  return (
    <div className="ep-wrapper">
      <div className="ep-sidebar-container">
        <NavLink to='/channel' style={{ textDecoration: "none", color: "inherit" }}>
        <div className='channel-container-arrow'>
            <i class="fa-solid fa-arrow-left"></i>
          <div>Channel content</div>
        </div>
        </NavLink>
        <img id="ep-video-thumbnail" src={video?.thumbnail}></img>
        <div className='your-video-channel-box'>
          <div id='your-video-channel-text'>Your video</div>
          <div id='your-video-channel-title'>{video?.title}</div>
        </div>
        <div className='channel-details-section'>
          <div>
            <i id='channel-sb-pencil-icon'  className="fa-solid fa-pencil" style={{ fontSize: '20px'}}></i>
          </div>
          <div id='channel-sb-details-text' style={{ fontSize: '14px', fontWeight: '600' }}>Details</div>
        </div>
      </div>
      <div className="ep-main-content-wrapper">
        <div className="ep-video-details-box">
          <div style={{ fontSize: '20px', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Video Details</div>
          <div className='ch-buttons'>
            <button id='channel-save-btn'onClick={handleSaveClick}>SAVE</button>
            <button id='channel-delete-btn' onClick={(e) => handleDeleteClick(video.id, e)}>DELETE</button>
          </div>
          {/* <div>
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div> */}
        </div>
        <div className="ep-actual-wrapper">
          <div className="ep-main-content-container">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="vd-form"
            >
              {/* <ul>
  				{errors.map((error, idx) => (
  					<li key={idx}>{error}</li>
  				))}
  			</ul> */}
              {errors.map((error, idx) => (
                <ul>
                  <li key={idx}>{error}</li>
                </ul>
              ))}
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                id="vd-edit-title-input"
              />
              <label>Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                required
                id="vd-edit-cat-input"
              />
              <label>Description</label>
              <input
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                id="vd-edit-desc-input"
              />
            </form>
          </div>
          <div className="ep-main-sidebar-container">
            <div>
              <video width="352px" height="198px" style={{ borderRadius: '5px'}} autoPlay controls>
                <source src={video?.url} />
              </video>
              {/* <div>
                <div>Video link</div>
                <div></div>
                <div>
                  <div>@videourl</div>
                  <div>copy symbol</div>
                </div>
              </div>
              <div>
                <div>Filename</div>
                <div>@filename</div>
              </div>
              <div>
                <div>Video quality</div>
                <div>SD HD symbols</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
