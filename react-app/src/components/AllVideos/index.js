import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllVideos } from '../../store/videos'

export default function AllVideos() {
const dispatch = useDispatch()
const allVideos = useSelector((state) => state.videos)
const videos = Object.values(allVideos.AllVideos)
console.log('---videos---', allVideos)


useEffect(() => {
    dispatch(getAllVideos())
}, [dispatch])

if (!videos.length) return null
return (
    <>
    {videos.map((video) => {
        return (
        <div>
            <NavLink to={`/video/${video.id}`}>
            <div>{video.title}</div>
            <div>{video.description}</div>
            <div>{video.category}</div>
            {/* <div>{video.url}</div>
            <div>{video.thumbnail_img}</div>
            <div>{video.created_at}</div>
            <div>{video.updated_at}</div> */}
            </NavLink>
        </div>
        )
    })}
    </>
)

}
