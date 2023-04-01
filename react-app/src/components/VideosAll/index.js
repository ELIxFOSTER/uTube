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
  console.log("---videos---", allVideos);
  //   console.log("---users---", allUsers.users);

  useEffect(() => {
    dispatch(getAllVideos());
    dispatch(getAllUsers());
  }, [dispatch]);

  if (!videos.length) return null;

  return (
    <div className="all-videos-wrapper">
      <div className='sidebar-wrapper'>SIDEBAR CONTENT</div>
      <div className='all-videos-section-container'>
      {videos.map((video) => {
        // const videoUser = allUsers?.users?.users?.find(
        //   (user) => user.id === video.user_id
        // );
        let videoUser = null;
        if (allUsers && allUsers.users && allUsers.users.users) {
          videoUser = allUsers.users.users.find(
            (user) => user.id === video.user_id
          );
        }
        return (
          <NavLink to={`/video/${video.id}`}
          style={{ textDecoration: 'none', color: 'inherit'}}>
            <div className="video-card">
              <div>
                <img id="thumbnail-img" src={video.thumbnail}></img>
              </div>
              <div className="sub-container">
                {videoUser && (
                  <img id="profile-pic-video" src={videoUser.profile_img}></img>
                )}
                <div className="video-details-container">
                  <div>{video.title}</div>
                  <div>{videoUser?.username}</div>
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


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { getAllVideos } from "../../store/videos";
// import { getAllUsers } from "../../store/session";
// import "./VideosAll.css";

// export default function VideosAll() {
//   const dispatch = useDispatch();
//   const allVideos = useSelector((state) => state.videos);
//   const allUsers = useSelector((state) => state.session);
//   const videos = Object.values(allVideos.AllVideos);
//   console.log("---videos---", allVideos);
//   //   console.log("---users---", allUsers.users);

//   useEffect(() => {
//     dispatch(getAllVideos());
//     dispatch(getAllUsers());
//   }, [dispatch]);

//   if (!videos.length) return null;

//   return (
//     <div className="all-videos-wrapper">
//       {videos.map((video) => {
//         let videoUser = null;
//         if (
//           allUsers &&
//           allUsers.users &&
//           Array.isArray(allUsers.users) &&
//           allUsers.users.length > 0
//         ) {
//           videoUser = allUsers.users.find(
//             (user) => user.id === video.user_id
//           );
//         }
//         return (
//           <NavLink to={`/video/${video.id}`}>
//             <div className="video-card">
//               <div>
//                 <img id="thumbnail-img" src={video.thumbnail}></img>
//               </div>
//               <div className="sub-container">
//                 {videoUser && (
//                   <img id="profile-pic-video" src={videoUser.profile_img}></img>
//                 )}
//                 <div className="video-details-container">
//                   <div>{video.title}</div>
//                   {videoUser ? (
//                     <div>{videoUser.username}</div>
//                   ) : (
//                     <div>User not found</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </NavLink>
//         );
//       })}
//     </div>
//   );
// }
