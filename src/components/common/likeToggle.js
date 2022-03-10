import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { getTokenFromLocalStorage } from "../../helper/helper"


const LikeToggleButton = ({ id }) => {

  const [profData, setProfData] = useState([])
  const [like, setLike] = useState(null)


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        })
        console.log(data)
        setProfData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const handleClick = async (e) => {
    // e.preventDefault()
    try {
      const { data } = await axios.post(`/api/insta/${id}/like/`, like, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
      setLike(data)
    } catch (error) {
      console.log(error.response)
    }
  }

  console.log(like)

  return (
    <>
      {like ? (
        <IconButton
          icon={<AiFillHeart />}
          onClick={(e) => {
            setLike(!like)
            handleClick(e)
          }}
        ></IconButton>
      ) : (
        <IconButton
          icon={<AiOutlineHeart />}
          onClick={(e) => {
            setLike(!like)
            handleClick(e)
          }}
          ></IconButton>
      ) }
    </>
  )
}

export default LikeToggleButton