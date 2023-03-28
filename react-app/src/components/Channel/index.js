import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewVideo } from '../../store/videos'
import { useHistory } from 'react-router-dom'
import { getCurrentUserVideos } from '../../store/videos'
import { deleteVideoThunk } from '../../store/videos'
import { NavLink } from 'react-router-dom'


export default function Channel() {
    const dispatch = useDispatch()
    const videoSelector = useSelector((state) => state.videos)
    const currentUserVideos = Object.values(videoSelector.UserVideos)
    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getCurrentUserVideos())
    }, [dispatch])

    const handleClick = async (videoId, e) => {
        e.preventDefault()
        await dispatch(deleteVideoThunk(videoId))
    }

    if (!sessionUser) return (
        <div>Please login to view channel</div>
    )

    return (
        <>
        {currentUserVideos.map((video) => {
            return (
                <>
                <NavLink to={`/video/${video.id}/edit`} >
                <div>
                    <div>{video.title}</div>
                    <div onClick={(e) => handleClick(video.id, e)} >Delete</div>
                </div>
                </NavLink>
                </>
            )
        })}
        </>
    )
}
