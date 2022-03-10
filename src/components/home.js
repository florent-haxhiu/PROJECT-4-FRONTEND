import { useEffect, useState } from "react"
import { Avatar, Box, Container, Flex, Heading, IconButton, Image, Link, Text, useColorMode, useColorModeValue } from "@chakra-ui/react"
import axios from "axios"
import { getTokenFromLocalStorage, userIsAuthenticated } from "../helper/helper"
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import LikeToggleButton from "./common/likeToggle"
import Profile from "./profile"

const Home = () => {

  const [arrData, setArrData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('api/insta/', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        })
        setArrData(data)
      } catch (error) {
        console.log(error.messages)
      }
    }
    getData()
  }, [])

  console.log(arrData)

  return (
    <>
      { userIsAuthenticated() ? (
        <>
          <Container p={5}>
            {arrData.map(({ author, comments, liked_by, post_image, created_at, caption, id }) => {
              return (
                <Box key={id} my={5} bg={'white'} border={'1px solid grey'}>
                  <Flex alignItems={'center'} p={'4px 5px'} bg={'lightgrey'}>
                    <Link to='/profile'>
                      <Avatar src={author.profile_image} />
                      <Text>{ author.username }</Text>
                    </Link>
                  </Flex>
                  <Box height={'12rem'} width={'100%'} display={'flex'} justifyContent={'center'}>
                    <Image src={post_image} alt="instaPost"  objectFit={'fill'} w={'100%'} h={'100%'} />
                  </Box>
                  <Box display={'flex'} alignItems={'center'}>
                    <LikeToggleButton id={id}/>
                    <FaRegComment />
                  </Box>
                  <Text>{liked_by.length} likes</Text>
                  <Box display={'flex'} alignItems={'center'}>
                    <Text>{ author.username }:</Text>
                    <Text>{ caption }</Text>
                  </Box>
                  <Box>{ comments.length } comments</Box>
                </Box>
              )
            })}
          </Container>
        </>
      ) : (
        <>
          <Container>
            <Heading>InstaDome</Heading>
          </Container>
        </>
      ) }
    </>
  )
}

export default Home