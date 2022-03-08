import { Box, Text } from "@chakra-ui/react"


const Footer = () => {
  return (
    <Box as="footer" py={15} bg={'white'} border={'1px solid rgba(219,219,219,1)'}>
      <Text textAlign={'center'} color={'rbga(142,142,142,1)'}>&copy; 2022 Made by Florent Haxhiu</Text>
    </Box>
  )
}

export default Footer