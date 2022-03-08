import { Container, Heading, Text, Box, VStack, Image, Button, FormControl, FormLabel, Input, Flex, SimpleGrid, Avatar, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helper/helper'


const EditProfile = () => {

  const [getData, setGetData] = useState([])
  const [formData, setFormData] = useState({
    username: '',
    profile_image: '',
    bio: '',
    first_name: '',
    last_name: '',
    email: ''
  })


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

  const handleChange = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put('/api/auth/profile', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} py={15}>
      <Box maxInlineSize={'734px'} w={'100%'} border={'1px solid rgba(219,219,219,1)'}>
        <Box bg={'white'} w={'100%'} h={'container.md'}>
          <form onSubmit={handleChange}>
            <SimpleGrid columns={2} spacing={10} py={5} px={10}>
                <Box>
                  <Avatar src={getData.profile_image} />
                </Box>
                <Box>
                  <Text>{getData.username}</Text>
                  <Box as='button' color={'blue.500'}>Change Profile Picture</Box>
                </Box>
                <Box>
                  <Text textAlign={'justify'}>First Name</Text>
                </Box>
                <Box>
                  <FormControl>
                    <Input name='first_name' defaultValue={getData.first_name}/> 
                  </FormControl>
                </Box>
                <Box>
                  <Text>Last Name</Text>
                </Box>
                <Box>
                  <FormControl>
                    <Input name='last_name' defaultValue={getData.last_name}/> 
                  </FormControl>
                </Box>
                <Box>
                  <Text>Username</Text>
                </Box>
                <Box>
                  <FormControl>
                    <Input name='username' defaultValue={getData.username}/>
                  </FormControl>
                </Box>
                <Box>
                  <Text>Bio</Text>
                </Box>
                <Box>
                  <FormControl>
                    <Textarea name='bio' defaultValue={getData.bio}></Textarea>
                  </FormControl>
                </Box>

            </SimpleGrid>
          </form>
        </Box>
      </Box>
    </Flex>
  )
}

export default EditProfile