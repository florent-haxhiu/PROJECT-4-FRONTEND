import { Button, Container, FormLabel, Heading, Input } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('instaDome-token', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      setTokenToLocalStorage(data.token)
      console.log(data)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    console.log('Name -> ', e.target.name)
    const newObj =  { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
  }

  return (
    <Container>
      <Heading>Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input id="username" onChange={handleChange} name="username" />
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password" onChange={handleChange} name="password" type={ 'password' } />
        <Button type="submit">Submit</Button>
      </form>
    </Container>
  )
}

export default Login