// import React, { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getVideoDetails } from "../../store/videos";
// import { getVideoComments } from "../../store/comments";

// export default function VideoDetails() {
// const dispatch = useDispatch()
// const { videoId } = useParams()
// const videoDetails = useSelector((state) => state.videos.VideoDetails)
// const commentsState = useSelector((state) => state.comments)
// const comments = Object.values(commentsState.VideoComments)
// // console.log('comments', comments.VideoComments)

// useEffect(() => {
//     dispatch(getVideoDetails(videoId))
//     dispatch(getVideoComments(videoId))
// }, [dispatch, videoId])

// // if (!videoDetails.length) return null
// // if (!comments.length) return null
//     return (
//         <>
//         <div>{videoDetails.title}</div>
//         {/* <iframe style={{ width: '500px', height: '500px' }}title='this' src={videoDetails.url}></iframe>
//          */}
//                      <video width='100%' height='auto' autoPlay controls>
//                 <source src={videoDetails?.url}/>
//             </video>
//         {comments.length > 0 ? (
//             comments.map((comment) => (
//                 <div>{comment.comment_text}</div>
//             ))
//         ): (
//             <>
//             <div>No comments</div>
//             </>
//         )}
//         </>
//     )

// import React, { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getVideoDetails } from "../../store/videos";
// import { getVideoComments } from "../../store/comments";
// import { clearVideo } from "../../store/videos";
// import { createNewComment } from "../../store/comments";
// import CommDotMenu from "../CommDotMenu";
// import LoginFormModal from "../LoginFormModal";

// export default function VideoDetails() {
//   const dispatch = useDispatch();
//   const { videoId } = useParams();
//   const videoDetails = useSelector((state) => state.videos.VideoDetails);
//   const commentsState = useSelector((state) => state.comments);
//   const comments = Object.values(commentsState.VideoComments);
//   const sessionUser = useSelector((state) => state.session.user);
//   const ulRef = useRef();

//   const [errors, setErrors] = useState([]);
//   const [comment_text, setComment] = useState("");

//   const [showMenu, setShowMenu] = useState(false)

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(async () => {
//     await dispatch(clearVideo());
//     await dispatch(getVideoDetails(videoId));
//     await dispatch(getVideoComments(videoId));
//   }, [dispatch, videoId]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     const response = await dispatch(
//       createNewComment({ comment_text, video_id: videoId })
//     );
//     if (response && response.errors) {
//       setErrors(response.errors);
//     }
//     setComment("");
//   };

//   const handleEdit = (comment) => {
//     setShowEdit(true);
//     setEditText(comment.comment_text);
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     // handle submitting the edited comment
//     setShowEdit(false);
//   };

//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
//   const closeMenu = () => setShowMenu(false);

//   if (!Object.values(videoDetails).length) return null;

//   return (
//     <>
//       <div>{videoDetails.title}</div>
//       <video width="80%" height="auto" autoPlay controls>
//         <source src={videoDetails?.url} />
//       </video>
//       <div>Comments</div>

//       <form onSubmit={handleCommentSubmit} encType="multipart/form-data">
//         <div className="comment-input-container">
//           <input
//             type="text"
//             placeholder="Add a comment"
//             value={comment_text}
//             onChange={(e) => {
//               setComment(e.target.value);
//               // setTyping(true);
//             }}
//             className="comment-input-field"
//             //   onBlur={() => setTyping(false)}
//           />
//           {/* {typing && comment && (
//                     )} */}
//           <button type="Submit" className="comment-send-btn" name="Submit">
//             <i className="fas fa-paper-plane"></i>
//           </button>
//         </div>
//         {errors.length > 0 && (
//           <ul>
//             {errors.map((error, idx) => (
//               <li key={idx}>{error}</li>
//             ))}
//           </ul>
//         )}
//       </form>

//       {/* {comments.length > 0 ? (
//         comments.map((comment) => <div>{comment.comment_text}</div>)
//       ) : (
//         <>
//           <div>No comments</div>
//         </>
//       )} */}
//   {comments.length > 0 ? (
//   comments.map((comment) => (
//     <div key={comment.id}>
//       <div>{comment.comment_text}</div>
//       {comment.user_id === sessionUser.id && (
//         <div>
//           <button onClick={() => setShowMenu(comment.id)}>
//             <i class="fa-solid fa-ellipsis-vertical"></i>
//           </button>
//           {showMenu === comment.id && (
//             <ul className={ulClassName} ref={ulRef}>
//               <li>Edit</li>
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   ))
// ) : (
//   <div>No comments</div>
// )}

//     </>
//   );
// }

// export default function VideoDetails() {
//   const dispatch = useDispatch();
//   const { videoId } = useParams();
//   const videoDetails = useSelector((state) => state.videos.VideoDetails);
//   const commentsState = useSelector((state) => state.comments);
//   const comments = Object.values(commentsState.VideoComments);
//   const sessionUser = useSelector((state) => state.session.user);
//   const ulRef = useRef();

//   const [errors, setErrors] = useState([]);
//   const [comment_text, setComment] = useState("");
//   const [showMenu, setShowMenu] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);
//   const [editText, setEditText] = useState("");

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(async () => {
//     await dispatch(clearVideo());
//     await dispatch(getVideoDetails(videoId));
//     await dispatch(getVideoComments(videoId));
//   }, [dispatch, videoId]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     const response = await dispatch(
//       createNewComment({ comment_text, video_id: videoId })
//     );
//     if (response && response.errors) {
//       setErrors(response.errors);
//     }
//     setComment("");
//   };

//   const handleEdit = (comment) => {
//     setShowEdit(true);
//     setEditText(comment.comment_text);
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     // handle submitting the edited comment
//     setShowEdit(false);
//   };

//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
//   const closeMenu = () => setShowMenu(false);

//   if (!Object.values(videoDetails).length) return null;

//   return (
//     <>
//       <div>{videoDetails.title}</div>
//       <video width="80%" height="auto" autoPlay controls>
//         <source src={videoDetails?.url} />
//       </video>
//       <div>Comments</div>

//       <form onSubmit={handleCommentSubmit} encType="multipart/form-data">
//         <div className="comment-input-container">
//           <input
//             type="text"
//             placeholder="Add a comment"
//             value={comment_text}
//             onChange={(e) => {
//               setComment(e.target.value);
//             }}
//             className="comment-input-field"
//           />
//           <button type="submit" className="comment-send-btn" name="Submit">
//             <i className="fas fa-paper-plane"></i>
//           </button>
//         </div>
//         {errors.length > 0 && (
//           <ul>
//             {errors.map((error, idx) => (
//               <li key={idx}>{error}</li>
//             ))}
//           </ul>
//         )}
//       </form>

//       {comments.length > 0 ? (
//         comments.map((comment) => (
//           <div key={comment.id}>
//             <div>{comment.comment_text}</div>
//             {comment.user_id === sessionUser.id && (
//               <div>
//                 <button onClick={() => setShowMenu(comment.id)}>
//                   <i className="fa-solid fa-ellipsis-vertical"></i>
//                 </button>
//                 {showMenu === comment.id && (
//                   <ul className={ulClassName} ref={ulRef}>
//                     <li onClick={() => handleEdit(comment)}>Edit</li>
//                   </ul>
//                 )}
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <div>No comments</div>
//       )}

//       {showEdit && (
//         <form onSubmit={handleEditSubmit}>
//           <input
//             type="text"
//             placeholder="Edit your comment"
//             value={editText}
//             onChange={(e) => setEditText(e.target.value)}
//           />
//           <button type="submit">Save</button>
//         </form>
//       )}
//     </>
//   );
// }


//* Working
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoDetails } from "../../store/videos";
import { getVideoComments } from "../../store/comments";
import { clearVideo } from "../../store/videos";
import { createNewComment, editComment, deleteComment } from "../../store/comments";
import CommDotMenu from "../CommDotMenu";
import LoginFormModal from "../LoginFormModal";
import './VideoDetails.css'

export default function VideoDetails() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const videoDetails = useSelector((state) => state.videos.VideoDetails);
  const commentsState = useSelector((state) => state.comments);
  const comments = Object.values(commentsState.VideoComments);
  const sessionUser = useSelector((state) => state.session.user);
  const ulRef = useRef();

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

  useEffect(async () => {
    await dispatch(clearVideo());
    await dispatch(getVideoDetails(videoId));
    await dispatch(getVideoComments(videoId));
  }, [dispatch, videoId]);

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
    setEditCommentId(comment.id);
    setShowEdit(true);
    setEditText(comment.comment_text);
  };

  const handleDelete = async (comment) => {
    const response = await dispatch(deleteComment(comment.id));
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
    }
    setShowEdit(false);
    setEditText("");
    setEditCommentId(null);
  };

  const ulClassName = "comment-menu-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  if (!Object.values(videoDetails).length) return null;

  return (
    <>
      <div>{videoDetails.title}</div>
      <video width="80%" height="auto" autoPlay controls>
        <source src={videoDetails?.url} />
      </video>
      <div>Comments</div>

      <form onSubmit={handleCommentSubmit} encType="multipart/form-data">
        <div className="comment-input-container">
          <input
            type="text"
            placeholder="Add a comment"
            value={comment_text}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            className="comment-input-field"
          />
          <button type="submit" className="comment-send-btn" name="Submit">            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        {errors.length > 0 && (
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
      </form>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            {editCommentId === comment.id ? (
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
              <>
                <div>{comment.comment_text}</div>
                {comment.user_id === sessionUser?.id && (
                  <div>
                    <button onClick={() => setShowMenu(comment.id)}>
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    {showMenu === comment.id && (
                      <ul className={ulClassName} ref={ulRef}>
                        <li onClick={() => handleEdit(comment)}>Edit</li>
                        <li onClick={() => handleDelete(comment)}>Delete</li>
                      </ul>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ))
      ) : (
        <div>No comments</div>
      )}
    </>
  );
}
// import React, { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getVideoDetails } from "../../store/videos";
// import { getVideoComments, createNewComment, editComment, deleteComment } from "../../store/comments";
// import { clearVideo } from "../../store/videos";
// import CommDotMenu from "../CommDotMenu";
// import LoginFormModal from "../LoginFormModal";

// export default function VideoDetails() {
//   const dispatch = useDispatch();
//   const { videoId } = useParams();
//   const videoDetails = useSelector((state) => state.videos.VideoDetails);
//   const commentsState = useSelector((state) => state.comments);
//   const comments = Object.values(commentsState.VideoComments);
//   const sessionUser = useSelector((state) => state.session.user);
//   const ulRef = useRef();

//   const [errors, setErrors] = useState([]);
//   const [comment_text, setComment] = useState("");
//   const [showMenu, setShowMenu] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);
//   const [editText, setEditText] = useState("");
//   const [editCommentId, setEditCommentId] = useState(null);

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current?.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   useEffect(async () => {
//     await dispatch(clearVideo());
//     await dispatch(getVideoDetails(videoId));
//     await dispatch(getVideoComments(videoId));
//   }, [dispatch, videoId]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     const response = await dispatch(
//       createNewComment({ comment_text, video_id: videoId })
//     );
//     if (response && response.errors) {
//       setErrors(response.errors);
//     }
//     setComment("");
//   };

//   const handleEdit = (comment) => {
//     setEditCommentId(comment.id);
//     setShowEdit(true);
//     setEditText(comment.comment_text);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     const response = await dispatch(
//       editComment({ id: editCommentId, comment_text: editText })
//     );
//     if (response && response.errors) {
//       setErrors(response.errors);
//     }
//     setShowEdit(false);
//     setEditText("");
//     setEditCommentId(null);
//   };

//   const handleDelete = async (comment) => {
//     const response = await dispatch(deleteComment(comment.id));
//     if (response && response.errors) {
//       setErrors(response.errors);
//     }
//   };

//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
//   const closeMenu = () => setShowMenu(false);

//   if (!Object.values(videoDetails).length) return null;
