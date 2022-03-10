import { Button, Container, FormControl, FormLabel, Input } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { getTokenFromLocalStorage } from "../helper/helper"
import React from "react"



const CreatePost = () => {
  
  const [postData, setPostData] = useState({
    caption: '',
    post_image: ''
  })

  const handleChange = (e) => {
    console.log('Name -> ', e.target.name)
    const newObj =  { ...postData, [e.target.name]: e.target.value }
    setPostData(newObj)
  }

  const imageUpload = async (e) => {
    try {
      console.log(e)
      const fileData = new FormData()
      fileData.append('file', e.target.files[0])
      fileData.append('upload_preset', process.env.REACT_APP_UPLOADPRESET)
      const { data } = await axios.post(`http://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`, fileData)
      console.log(data)
      setPostData({ ...postData, post_image: data.url })
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/insta/', { data: postData }, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      console.log(data)
    } catch (error) {
      console.log(error.messages)
    }
  }


  
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="image">Image</FormLabel>
          <input type={'file'} accept="images/*" onChange={imageUpload} name="post_image" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="caption">Caption</FormLabel>
          <Input name="caption" onChange={handleChange} type={'texts'}/>
        </FormControl>
        <Button type="submit">Post</Button>
      </form>
    </Container>
  )
}

export default CreatePost