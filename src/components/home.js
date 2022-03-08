import { useEffect, useState } from "react"
import { Box, Container, Heading, Image, Text } from "@chakra-ui/react"
import axios from "axios"
import { getTokenFromLocalStorage, userIsAuthenticated } from "../helper/helper"

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
          <Container bg={'white'}>
            <Heading>InstaDome</Heading>
            {arrData.map(({ author, comments, liked_by, post_image, created_at, caption, id }) => {
              return (
                <Box key={id}>
                  <Image src={post_image} alt="instaPost" />
                  <Box>
                    <Text>{ caption }</Text>
                  </Box>
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