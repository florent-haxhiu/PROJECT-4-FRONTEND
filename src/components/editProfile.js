import { Container, Heading, Text, Box, VStack, Image, Button, FormControl, FormLabel, Input, Flex, SimpleGrid, Avatar, Textarea, Checkbox } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { getTokenFromLocalStorage } from '../helper/helper'


const EditProfile = () => {

  const [getData, setGetData] = useState([])

  const [formData, setFormData] = useState({
    username: '',
    profile_image: '',
    bio: '',
    first_name: '',
    last_name: '',
  })

  const imageUpload = async (e) => {
    try {
      const fileData = new FormData()
      fileData.append('file', e.target.files[0])
      fileData.append('upload_preset', process.env.REACT_APP_UPLOADPRESET)
      const { data } = await axios.post(`http://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`, fileData)
      console.log(data)
      setFormData({ ...formData, profile_image: data.url })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const profData = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        })
        console.log(data)
        setGetData(data)
      } catch (error) {
        console.log(error.response)
      }
    }
    profData()
  }, [])

  const handleChange = (e) => {
    console.log('Name -> ', e.target.name)
    const newObj =  { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/auth/${getData.id}/edit/`, formData , {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      console.log(data)
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} py={15}>
      <Box maxInlineSize={'734px'} w={'100%'} border={'1px solid rgba(219,219,219,1)'}>
        <Box bg={'white'} w={'100%'} h={'container.md'}>
          <form onSubmit={handleSubmit}>
            <SimpleGrid columns={2} spacing={10} py={5} px={10}>
                <Box>
                  <Avatar src={getData.profile_image} />
                </Box>
                <Box>
                  <Text>{getData.username}</Text>
                  <input type={'file'} accept="images/*" onChange={imageUpload} name="post_image" />
                </Box>
                <Box>
                  <Text textAlign={'justify'}>First Name</Text>
                </Box>
                <Box>
                  <FormControl>
                    <Input name='first_name' type={'text'} onChange={handleChange} defaultValue={getData.first_name}/> 
                  </FormControl>
                </Box>
                <Box>
                  <Text>Last Name</Text>
                </Box>
                <Box>
                  <FormControl>
                    <Input name='last_name' type={'text'} onChange={handleChange} defaultValue={getData.last_name}/> 
                  </FormControl>
                </Box>
                <Box>
                  <Text>Username</Text>
                </Box>
                <Box>
                  <FormControl>
                    <Input name='username' type={'text'} onChange={handleChange} defaultValue={getData.username}/>
                  </FormControl>
                </Box>
                <Box>
                  <Text>Bio</Text>
                </Box>
                <Box>
                  <FormControl>
                    <Textarea name='bio' type={'text'} onChange={handleChange} defaultValue={getData.bio}></Textarea>
                  </FormControl>
                </Box>
                <Box>
                  <Text>Email</Text>
                </Box>
                <Box>
                  <FormControl>
                    <Input name='email' onChange={handleChange} defaultValue={getData.email} type={'email'} />
                  </FormControl>
                </Box>
            </SimpleGrid>
            <Box w={'100%'} display={'flex'} justifyContent={'center'}>
              <Button type='submit'>Submit</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Flex>
  )
}

export default EditProfile