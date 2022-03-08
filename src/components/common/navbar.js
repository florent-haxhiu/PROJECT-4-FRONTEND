import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { userIsAuthenticated } from '../../helper/helper'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('instaDome-token')
    navigate('/')
  }

  return (
    <Box mb={15} bg={"white"}>
      {userIsAuthenticated() ? (
        <>
          <Stack direction={'row'}>
            <Link to='/'>
              <Heading>InstaDome</Heading> 
            </Link>
            <Link to='/profile'>
              <Text>Profile</Text>
            </Link>
            <Link onClick={handleLogout} to='/'>
              <Text>Logout</Text>
            </Link>
          </Stack>
        </> 
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