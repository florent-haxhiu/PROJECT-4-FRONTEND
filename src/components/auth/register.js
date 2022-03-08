import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'


const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    email: '',
    first_name: '',
    last_name: '',
    profile_image: '',
  })
  
  const handleChange = (e) => {
    console.log('Name -> ', e.target.name)
    const newObj =  { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/register/', formData)
      console.log(data)
      navigate('/login')
    } catch (error) {
      console.log(error.messages)
    }
  }

  return (
    <Container bg={'white'}>
      <Heading>Register</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor='username'>Username</FormLabel>
          <Input id='newUser' onChange={handleChange} name='username' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input id='newEmail' onChange={handleChange} name='email' type={'email'} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input id='newPass' onChange={handleChange} name='password' type={'password'} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='password'>Password Confirmation</FormLabel>
          <Input id='newPassConf' onChange={handleChange} name='password_confirmation' type={'password'} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='textfield'>First Name</FormLabel>
          <Input id='firstname' onChange={handleChange} name='first_name' type={'text'} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='password'>Last Name</FormLabel>
          <Input id='newPassConf' onChange={handleChange} name='last_name' type={'text'} />
        </FormControl>
        <FormControl>
          <FormControl htmlFor='image'>Profile Image</FormControl>
          <InputGroup>
            <InputLeftAddon children={'Choose a file'} />
            <Input id="profile_pic" onChange={handleChange} name='profile_image' type={'file'} />
          </InputGroup>
        </FormControl>
        <FormControl>
          <Button type='submit' mt={4}>Submit</Button>
        </FormControl>
      </form>
    </Container>
  )
}

export default Register