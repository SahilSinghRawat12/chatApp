import React from 'react'
import bgImage from "../assets/bg.jpg"
import bgImage1 from "../assets/bg1.jpg"
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    <div className='bg-cover bg-center h-screen w-full flex justify-center items-center '
     style={{ backgroundImage: `url(${bgImage1})` }}
    > 
       <LoginForm/>
    </div>
  )
}

export default Login