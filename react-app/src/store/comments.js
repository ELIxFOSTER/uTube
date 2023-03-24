const LOAD_VIDEO_COMMENTS = 'comments/LOAD_COMMENTS'

const loadComments = (videoComments) => {
    return {
        type: LOAD_VIDEO_COMMENTS,
        videoComments
    }
}

export const getVideoComments = (videoId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${videoId}`);

    if (response.ok) {
      const data = await response.json();
      dispatch(loadComments(data));
      return data;
    }
  };

  let initialState = {
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
      default:
        return state;
    }
  }
