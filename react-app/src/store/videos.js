const LOAD_VIDEOS = 'videos/LOAD_VIDEOS'


const loadVideos = (allVideos) => {
    return {
        type: LOAD_VIDEOS,
        allVideos
    }
}


export const getAllVideos = () => async (dispatch) => {
    const response = await fetch('/api/videos/')

    if (response.ok) {
        const videosData = await response.json()
        dispatch(loadVideos(videosData))
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
        default:
            return state
    }
}

export default videos
