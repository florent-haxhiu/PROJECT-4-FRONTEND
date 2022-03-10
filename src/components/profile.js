import { Box, Button, Container, Divider, Heading, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getTokenFromLocalStorage } from "../helper/helper"

const Profile = () => {

  const params = useParams()
  console.log(params)
  
  const [profileData, setProfileData] = useState([])

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        })
        console.log(data)
        setProfileData(data)
      } catch (error) {
        console.log(error.response)
      }
    }
    getProfileData()
  }, [])

  // console.log(profileData.follows)

  return (
    <Container display={'flex'} flexDir={'column'}>
      <Stack h={'10rem'} w={'100%'} direction={'row'} spacing={10}>
        <Image src={profileData.profile_image} w={'150px'} h={'150px'} />
        <Stack spacing={5} direction={'column'}>
          <HStack>
            <Heading>{profileData.username}</Heading>
            <Button border={'5px'} bg={'crimson'}>
              <Link to={'/profile/edit'}>
                Edit Profile
              </Link>
            </Button>
          </HStack>
          <HStack>
            {/* <Text>{profileData.posts_created.length} posts</Text>
            <Text>{profileData.followed_by.length} followers</Text>
            <Text>{profileData.follows.length} following</Text> */}
          </HStack>
          <VStack alignItems={'flex-start'}>
            <Text>{profileData.first_name}</Text>
            <Text>{profileData.bio}</Text>
          </VStack>
        </Stack>
      </Stack>
      <Divider />
      {/* <Box>
        {profileData.posts_created.map({ id, post_image, liked_by, comments } => {

            <Box key={id}></Box>
        })
        }
      </Box> */}
    </Container>
  )
}

export default Profile