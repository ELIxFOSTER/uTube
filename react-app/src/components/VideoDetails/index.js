import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoDetails } from "../../store/videos";
import { getVideoComments } from "../../store/comments";

export default function VideoDetails() {
const dispatch = useDispatch()
const { videoId } = useParams()
const videoDetails = useSelector((state) => state.videos.VideoDetails)
const commentsState = useSelector((state) => state.comments)
const comments = Object.values(commentsState.VideoComments)
// console.log('comments', comments.VideoComments)

useEffect(() => {
    dispatch(getVideoDetails(videoId))
    dispatch(getVideoComments(videoId))
}, [dispatch, videoId])

// if (!videoDetails.length) return null
// if (!comments.length) return null
    return (
        <>
        <div>{videoDetails.title}</div>
        {comments.length > 0 ? (
            comments.map((comment) => (
                <div>{comment.comment_text}</div>
            ))
        ) : (
            <div>No comments</div>
        )}
        </>
    )
}
