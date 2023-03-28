const LOAD_VIDEOS = "videos/LOAD_VIDEOS";
const LOAD_VIDEO_DETAILS = "videos/LOAD_VIDEO_DETAILS";
const LOAD_CURRENTUSER_VIDEOS = "videos/LOAD_CURRENTUSER_VIDEOS";
const CREATE_VIDEO = "videos/CREATE_VIDEO";
const EDIT_VIDEO = "videos/EDIT_VIDEO";
const DELETE_VIDEO = "videos/DELETE_VIDEO";
const CLEAR_VIDEO ='videos/CLEAR_VIDEO'

const normalizer = (data) => {
  const normalData = {};
  data.forEach((element) => (normalData[element.id] = element));
  return normalData;
};

export const clearVideo = () => {
    return {
        type: CLEAR_VIDEO
    }
}

const loadVideos = (allVideos) => {
  return {
    type: LOAD_VIDEOS,
    allVideos,
  };
};

const loadVideoDetails = (video) => {
  return {
    type: LOAD_VIDEO_DETAILS,
    video,
  };
};

const loadCurrentUserVideos = (videos) => {
  return {
    type: LOAD_CURRENTUSER_VIDEOS,
    videos,
  };
};

const createVideo = (video) => {
  return {
    type: CREATE_VIDEO,
    video,
  };
};

const editVideo = (video) => {
  return {
    type: EDIT_VIDEO,
    video,
  };
};

const deleteVideo = (videoId) => {
  return {
    type: DELETE_VIDEO,
    videoId,
  };
};

export const getAllVideos = () => async (dispatch) => {
  const response = await fetch("/api/videos/");

  if (response.ok) {
    const videosData = await response.json();
    dispatch(loadVideos(videosData));
  }
};

export const getVideoDetails = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/videos/${videoId}`);

  if (response.ok) {
    const videoData = await response.json();
    dispatch(loadVideoDetails(videoData));
  }
};

export const getCurrentUserVideos = () => async (dispatch) => {
  const response = await fetch("/api/videos/current");

  if (response.ok) {
    const videoData = await response.json();
    const normalizedPins = normalizer(videoData);
    dispatch(loadCurrentUserVideos(normalizedPins));
    return videoData;
  }
};

export const createNewVideo = (videoData) => async (dispatch) => {
    const response = await fetch("/api/videos/", {
      method: "POST",
      body: videoData,
    });

    if (response.ok) {
      console.log("----response went through----");
      const newVideo = await response.json();
      dispatch(createVideo(newVideo));
      return newVideo;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  };


export const editVideoThunk = (videoData, videoId) => async (dispatch) => {
    console.log('videoData in thunk', videoData)
  const response = await fetch(`/api/videos/${videoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(videoData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editVideo(data));
  } else {
    const errorData = await response.json();
    return errorData;
  }
};


export const deleteVideoThunk = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/videos/${videoId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteVideo(videoId));
  }
};

const initialState = { AllVideos: {}, VideoDetails: {}, UserVideos: {} };

const videos = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_VIDEOS: {
      action.allVideos.forEach((ele) => (newState.AllVideos[ele.id] = ele));
      return newState;
    }
    case LOAD_VIDEO_DETAILS: {
      newState.VideoDetails = action.video;
      return newState;
    }
    case LOAD_CURRENTUSER_VIDEOS: {
      newState.UserVideos = action.videos;
      return newState;
    }
    case DELETE_VIDEO: {
      const newState = {
        ...state,
        UserVideos: { ...state.UserVideos },
        AllPins: {},
      };
      delete newState.UserVideos[action.videoId];
      return newState;
    }
    case EDIT_VIDEO: {
        const newState = {...state, UserVideos: {...state.UserVideos}}
        newState.UserVideos[action.video.id] = action.video
        return newState
    }
    case CLEAR_VIDEO: {
        newState.VideoDetails = {}
        return newState
    }
    default:
      return state;
  }
};

export default videos;
