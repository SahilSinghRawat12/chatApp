import React from 'react'
import bgImage from "../assets/bg.jpg"
import bgImage1 from "../assets/bg1.jpg"
import RegisterForm from '../components/RegisterForm'

const Register = () => {
  return (
    <div className='bg-cover bg-center h-screen w-full flex justify-center items-center '
     style={{ backgroundImage: `url(${bgImage1})` }}
    >
       <RegisterForm/>
    </div>
  )
}

export default Register