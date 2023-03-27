// enctype='multipart/form-data' on the form as an attribute


import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewVideo } from '../../store/videos'
import { useHistory } from 'react-router-dom'


export default function VideoForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)
    console.log('---session user---', sessionUser)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [userId, setUserId] = useState(sessionUser.id)
    const [thumbnail, setThumbnail] = useState('')
    const [url, setUrl] = useState('')
    // const [urlLoading, setUrlLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append('title', title)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('thumbnail', thumbnail)
        formData.append('url', url)
        formData.append('user_id', userId)

        // setUrlLoading(true)

        const data = await dispatch(createNewVideo(formData))

        if (data) {
            // setUrlLoading('false')
            setErrors(data)
        } else {
            // setUrlLoading('false')
            setTitle('')
            setDescription('')
            setCategory('')
            setUrl('')
            setThumbnail('')
            history.push('/')
        }
    }


return (
    <>
        <h1>Video Form</h1>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input
                name='url'
                type='file'
                onChange={(e) => setUrl(e.target.files[0])}
            />
            <input
                name='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='title'
                required
            />
            <input
                name='category'
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='category'
                required
            />
            <input
                name='description'
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='description'
                required
            />
             <input
                name='thumbnail'
                type='text'
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder='thumbnail'
                required
            />
            <input type="hidden" name="user_id" value={userId} />
            <button type='submit'>Create</button>
            {/* {(urlLoading) && <p>Loading...</p>} */}
        </form>
    </>
)
}