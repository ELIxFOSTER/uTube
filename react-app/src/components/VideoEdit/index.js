import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editVideoThunk } from "../../store/videos";
import { getVideoDetails } from "../../store/videos";

export default function VideoEdit() {
  const dispatch = useDispatch();
  const { videoId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);
  const video = useSelector((state) => state.videos.VideoDetails);
  const history = useHistory();

  const [title, setTitle] = useState(video.title);
  const [category, setCategory] = useState(video.category);
  const [description, setDescription] = useState(video.description);
//   const [thumbnail, setThumbnail] = useState(video.thumbnail);
  const url = video.url

  useEffect(() => {
    dispatch(getVideoDetails(videoId));
  }, [dispatch, videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = sessionUser.id;
    const thumbnail = video.thumbnail

    let videoData = {
      title,
      category,
      description,
      user_id,
      url,
      thumbnail,
    };

    console.log('videoData', videoData)

    const newVideo = await dispatch(editVideoThunk(videoData, videoId));
    if (newVideo) {
      // history.push('/')
    }
  };

  return (
    <>
      <h1>Edit Video Route</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button>Submit</button>
      </form>
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { editVideoThunk } from "../../store/videos";
// import { getVideoDetails } from "../../store/videos";

// export default function VideoEdit() {
//   const dispatch = useDispatch();
//   const { videoId } = useParams();

//   const sessionUser = useSelector((state) => state.session.user);
//   const video = useSelector((state) => state.videos.VideoDetails);
//   const history = useHistory();

//   const [isLoading, setIsLoading] = useState(true);
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [url, setUrl] = useState("");

//   useEffect(() => {
//     dispatch(getVideoDetails(videoId));
//   }, [dispatch, videoId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const user_id = sessionUser.id;

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("category", category);
//     formData.append("description", description);
//     formData.append("url", url);
//     formData.append("thumbnail", thumbnail);
//     formData.append("user_id", user_id);

//     const newVideo = await dispatch(editVideoThunk(formData, videoId));
//     if (newVideo) {
//       history.push("/");
//     }
//   };

//   useEffect(() => {
//     async function fetchData() {
//       setIsLoading(true);
//       await dispatch(getVideoDetails(videoId));
//       setIsLoading(false);
//     }
//     fetchData();
//   }, [dispatch, videoId]);

//   return (
//     <>
//       <h1>Edit Video Route</h1>
//       <form onSubmit={handleSubmit} enctype="multipart/form-data">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Title"
//           required
//         />
//         <input
//           type="text"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="Category"
//           required
//         />
//         <input
//           type="textarea"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//           required
//         />
//         <input
//           type="text"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           name="url" // set the name attribute
//           placeholder="Video URL"
//           required
//         />
//         <input
//           type="text"
//           value={thumbnail}
//           onChange={(e) => setThumbnail(e.target.value)}
//           name="thumbnail" // set the name attribute
//           placeholder="Thumbnail URL"
//           required
//         />
//         <button>Submit</button>
//       </form>
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { editVideoThunk } from "../../store/videos";
// import { getVideoDetails } from "../../store/videos";

// export default function VideoEdit() {
//   const dispatch = useDispatch();
//   const { videoId } = useParams();

//   const sessionUser = useSelector((state) => state.session.user);
//   const video = useSelector((state) => state.videos.VideoDetails);
//   const history = useHistory();

//   const [isLoading, setIsLoading] = useState(true);
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const url = "";

//   useEffect(() => {
//     dispatch(getVideoDetails(videoId));
//   }, [dispatch, videoId]);

//   useEffect(() => {
//     if (video) {
//       setTitle(video.title);
//       setCategory(video.category);
//       setDescription(video.description);
//       setThumbnail(video.thumbnail);
//       setIsLoading(false);
//     }
//   }, [video]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const user_id = sessionUser.id;

//     let videoData = {
//       title,
//       category,
//       description,
//       user_id,
//       url,
//       thumbnail,
//     };

//     if (!title || !category || !description || !url || !thumbnail || !user_id) {
//       return;
//     }

//     console.log('videoData', videoData)

//     const newVideo = await dispatch(editVideoThunk(videoData, videoId));
//     if (newVideo) {
//       // history.push('/')
//     }
//   };
//   return (
//     <>
//       <h1>Edit Video Route</h1>
//       <form onSubmit={handleSubmit} encType='multipart/form-data'>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Title"
//           required
//         />
//         <input
//           type="text"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="Category"
//           required
//         />
//         <input
//           type="textarea"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//           required
//         />
//         <button>Submit</button>
//       </form>
//     </>
//   );
// }
