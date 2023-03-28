// const LOAD_VIDEO_COMMENTS = "comments/LOAD_COMMENTS";
// const CREATE_COMMENT = "comments/CREATE_COMMENTS";

// const loadComments = (videoComments) => {
//   return {
//     type: LOAD_VIDEO_COMMENTS,
//     videoComments,
//   };
// };

// const createComment = (obj) => {
//   return {
//     type: CREATE_COMMENT,
//     obj,
//   };
// };

// export const getVideoComments = (videoId) => async (dispatch) => {
//   const response = await fetch(`/api/comments/${videoId}`);

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(loadComments(data));
//     return data;
//   }
// };

// export const createNewComment = (commentData) => async (dispatch) => {
//   const response = await fetch("/api/comments/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(commentData),
//   });
//   if (response.ok) {
//     const newComment = await response.json();
//     dispatch(createComment(newComment));
//   } else {
//     const errorData = await response.json();
//     return errorData;
//   }
// };

// let initialState = {
//   AllComments: {},
//   VideoComments: {},
// };

// export default function comments(state = initialState, action) {
//   switch (action.type) {
//     case LOAD_VIDEO_COMMENTS: {
//       return {
//         ...state,
//         VideoComments: action.videoComments,
//       };
//     }
//     case CREATE_COMMENT: {
//       const newState = { ...state, VideoComments: { ...state.VideoComments } };
//       newState.VideoComments[action.obj.id] = action.obj;
//       return newState;
//     }
//     default:
//       return state;
//   }
// }


// const LOAD_VIDEO_COMMENTS = "comments/LOAD_COMMENTS";
// const CREATE_COMMENT = "comments/CREATE_COMMENTS";
// const EDIT_COMMENT = "comments/EDIT_COMMENT";

// const loadComments = (videoComments) => {
//   return {
//     type: LOAD_VIDEO_COMMENTS,
//     videoComments,
//   };
// };

// const createComment = (obj) => {
//   return {
//     type: CREATE_COMMENT,
//     obj,
//   };
// };

// const editCommentAction = (comment) => {
//   return {
//     type: EDIT_COMMENT,
//     comment,
//   };
// };

// export const getVideoComments = (videoId) => async (dispatch) => {
//   const response = await fetch(`/api/comments/${videoId}`);

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(loadComments(data));
//     return data;
//   }
// };

// export const createNewComment = (commentData) => async (dispatch) => {
//   const response = await fetch("/api/comments/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(commentData),
//   });
//   if (response.ok) {
//     const newComment = await response.json();
//     dispatch(createComment(newComment));
//   } else {
//     const errorData = await response.json();
//     return errorData;
//   }
// };

// export const editComment = (commentData) => async (dispatch) => {
//   const response = await fetch(`/api/comments/${commentData.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(commentData),
//   });
//   if (response.ok) {
//     const updatedComment = await response.json();
//     dispatch(editCommentAction(updatedComment));
//   } else {
//     const errorData = await response.json();
//     return errorData;
//   }
// };

// let initialState = {
//   AllComments: {},
//   VideoComments: {},
// };

// export default function comments(state = initialState, action) {
//   switch (action.type) {
//     case LOAD_VIDEO_COMMENTS: {
//       return {
//         ...state,
//         VideoComments: action.videoComments,
//       };
//     }
//     case CREATE_COMMENT: {
//       const newState = { ...state, VideoComments: { ...state.VideoComments } };
//       newState.VideoComments[action.obj.id] = action.obj;
//       return newState;
//     }
//     case EDIT_COMMENT: {
//       const newState = { ...state, VideoComments: { ...state.VideoComments } };
//       newState.VideoComments[action.comment.id] = action.comment;
//       return newState;
//     }
//     default:
//       return state;
//   }
// }


const LOAD_VIDEO_COMMENTS = "comments/LOAD_COMMENTS";
const CREATE_COMMENT = "comments/CREATE_COMMENTS";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

const loadComments = (videoComments) => {
  return {
    type: LOAD_VIDEO_COMMENTS,
    videoComments,
  };
};

const createComment = (obj) => {
  return {
    type: CREATE_COMMENT,
    obj,
  };
};

const editCommentAction = (comment) => {
  return {
    type: EDIT_COMMENT,
    comment,
  };
};

const deleteSingleComment = (id) => {
  return {
    type: DELETE_COMMENT,
    payload: id,
  };
};

export const getVideoComments = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${videoId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadComments(data));
    return data;
  }
};

export const createNewComment = (commentData) => async (dispatch) => {
  const response = await fetch("/api/comments/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });
  if (response.ok) {
    const newComment = await response.json();
    dispatch(createComment(newComment));
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

export const editComment = (commentData) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });
  if (response.ok) {
    const updatedComment = await response.json();
    dispatch(editCommentAction(updatedComment));
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSingleComment(commentId));
  }
};


let initialState = {
  AllComments: {},
  VideoComments: {},
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case LOAD_VIDEO_COMMENTS: {
      return {
        ...state,
        VideoComments: action.videoComments,
      };
    }
    case CREATE_COMMENT: {
      const newState = { ...state, VideoComments: { ...state.VideoComments } };
      newState.VideoComments[action.obj.id] = action.obj;
      return newState;
    }
    case EDIT_COMMENT: {
      const newState = { ...state, VideoComments: { ...state.VideoComments } };
      newState.VideoComments[action.comment.id] = action.comment;
      return newState;
    }
    case DELETE_COMMENT: {
      const newState = { ...state, VideoComments: { ...state.VideoComments } };
      delete newState.VideoComments[action.payload];
      return newState;
    }
    default:
      return state;
  }
}
