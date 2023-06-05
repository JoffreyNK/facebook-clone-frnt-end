import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { useMutation } from '@tanstack/react-query'
import { makeRequest } from '../../context/requests'


import './createPost.css'

const CreatePost = () => {
  const {currentUser} = useContext(AuthContext)
  const [postData, setPostData] = useState({description:null, postImage:null})

  const mutation = useMutation({
    mutationFn: (data) => {
      console.log(postData)
      const formData = new FormData()
      formData.set('description', data.description)
      formData.set('postImage', data.postImage)
      return makeRequest.post('/posts', formData, {
        headers: {'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryl75WdZW7JBJ8IQ0Y',}
      })
    },
    // onSuccess:
  })

  return (
    <form>
      <div className='upper'>
        <div className='img'>
        <img src={currentUser.profilePicture} alt='user profile' />
        </div>
        <textarea rows={4}  placeholder='what is in your mind' name='description' onChange={e=>setPostData({...postData, description:e.target.value})}></textarea>
      </div>
      <div className='lower'>
        <input type='file'  onChange={e=>setPostData({...postData, postImage:e.target.files[0]})} name='postImage' alt='choose picture' />
        <button type='button' onClick={()=>{mutation.mutate(postData)}}>post</button>
      </div>
    </form>
  )
}

export default CreatePost