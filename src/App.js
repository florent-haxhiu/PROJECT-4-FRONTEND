import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Importing all pages
import Navbar from "./components/common/navbar"
import Register from './components/auth/register'
import Login from './components/auth/login'
import Home from './components/home'
import Profile from './components/profile'
import EditProfile from './components/editProfile'
import { Box } from '@chakra-ui/react'
import Footer from './components/common/footer'

function App() {
  return (
    <Box m={0} p={0} bg={'whitesmoke'} minH={'100vh'}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/profile/edit' element={<EditProfile />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
      <Footer />
    </Box>
  )
}

export default App
