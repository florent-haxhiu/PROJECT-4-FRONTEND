import { Avatar, Box, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Text, Image } from '@chakra-ui/react'
import { getTokenFromLocalStorage, userIsAuthenticated } from '../../helper/helper'
import { Link, useNavigate } from 'react-router-dom'
import { GoDiffAdded } from 'react-icons/go'
import { extendTheme } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import createPos from '../../img/createPost.svg'

const Navbar = () => {

  const navigate = useNavigate()

  const [profileData, setProfileData] = useState([])

  const handleLogout = () => {
    window.localStorage.removeItem('instaDome-token')
    navigate('/')
  }

  useEffect(() => {
    const Data = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        })
        setProfileData(data)
      } catch (error) {
        console.log(error)
      }
    }
    Data()
  }, [])

  return (
    <Box mb={15} bg={"white"}>
      {userIsAuthenticated() ? (
        <Box borderBottom={'1px solid rgba(219,219,219,1)'}>
          <Stack direction={'row'} py={3} alignItems={'center'}>
            <Box className='gld'>
              <Link to='/'>
                <Heading>InstaDome</Heading> 
              </Link>
            </Box>
            <Flex className='gld' w={'100%'} gap={5} justifyContent={'flex-end'}>
              <Link to='/createPost'>
                <Image src={createPos} />
              </Link>
              <Link to='/messages'>
                <Text>DM</Text>
              </Link>
                <Menu>
                  <MenuButton>
                    <Avatar src={profileData.profile_image} />
                  </MenuButton>
                  <MenuList>
                  <Link to='/profile'><MenuItem>Profile</MenuItem></Link>
                    <Link to='/profile/edit'><MenuItem>Edit Profile</MenuItem></Link>
                  </MenuList>
                </Menu>
              <Link onClick={handleLogout} to='/'>
                <Text>Logout</Text>
              </Link>
            </Flex>
          </Stack>
        </Box>
      ) : ( 
        <>
          <Stack direction={'row'}>
            <Link to='/'>
              <Heading>InstaDome</Heading> 
            </Link>
            <Link to='/register'>
              <Heading>Register</Heading>
            </Link>
            <Link to='/login'>
              <Heading>Login</Heading>
            </Link>
          </Stack>
        </> 
        )
      }
    </Box>
  )
}

export default Navbar