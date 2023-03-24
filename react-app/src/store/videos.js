const LOAD_VIDEOS = 'videos/LOAD_VIDEOS'
const LOAD_VIDEO_DETAILS = 'videos/LOAD_VIDEO_DETAILS'


const loadVideos = (allVideos) => {
    return {
        type: LOAD_VIDEOS,
        allVideos
    }
}

const loadVideoDetails = (video) => {
    return {
        type: LOAD_VIDEO_DETAILS,
        video
    }
}


export const getAllVideos = () => async (dispatch) => {
    const response = await fetch('/api/videos/')

    if (response.ok) {
        const videosData = await response.json()
        dispatch(loadVideos(videosData))
    }
}

export const getVideoDetails = (videoId) => async (dispatch) => {
    const response = await fetch(`/api/videos/${videoId}`)

    if (response.ok) {
        const videoData = await response.json()
        dispatch(loadVideoDetails(videoData))
    }
}

const initialState = { AllVideos: {}, VideoDetails: {}, UserVideos: {} }

const videos = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_VIDEOS: {
            action.allVideos.forEach((ele) => newState.AllVideos[ele.id] = ele)
            return newState
        }
        case LOAD_VIDEO_DETAILS: {
            newState.VideoDetails = action.video
            return newState
        }
        default:
            return state
    }
}

export default videos
