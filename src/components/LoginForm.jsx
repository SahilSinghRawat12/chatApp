import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth , signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase/firebase';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
 

const auth = getAuth(app);
 
const LoginForm = () => {
     
 const [formData , setFormData] = useState({email : "" , password : ""})
 
 
 const [showPassword2 , setShowPassword2] = useState(false);

 const navigate = useNavigate();

 function changeHandler(event)
 {
         setFormData(prevFormData =>{
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
         })
 }

 function submitHandler(event)
 {
     event.preventDefault();

     signInWithEmailAndPassword(auth , formData.email , formData.password)
       .then( (value) => {
          toast.success("Logged in successfully");
          
          setTimeout(()=>{
           navigate("/home");          
          } , 700)
       })

       .catch( (error) => {
        
          const errorCode = error.code;

          if(errorCode === "auth/invalid-credential")
          {
             toast.error("Invalid email or password");
          }

          else if(errorCode === "auth/user-not-found")
          {
             toast.error("No account found with this email")
          }

          else if(errorCode === "auth/invalid-email")
          {
             toast.error("Enter a valid email");
          }

          else if(errorCode === "auth/too-many-requests")
          {
             toast.error("Too many attempts, try again later");
          }
           
          else {
            toast.error("Something went wrong");
          }
       });
 }
 

 
  return (
    <div className='bg-[#7a98cd] w-[300px]  sm:w-[370px] h-[400px] rounded-md shadow-md'>

        <div className='flex flex-col items-center my-5'>
           <h1 className='text-3xl font-bold'>Sign In</h1>
           <span className='text-lg mt-2 font-semibold'>Welcome back, login to continue</span>
        </div>

         <form onSubmit={submitHandler} 
         className='flex flex-col mt-10 px-5 gap-y-5'
         >
             <label>
                <input
                   type='email'
                   placeholder='Email'
                   onChange={changeHandler}
                   name='email'
                   value={formData.email}

                  className=' w-full p-2 rounded-md border border-black bg-transparent placeholder:text-black'
                />         
                      
             </label>

             <label className='relative'>
                <input
                  type= {showPassword2 ? "text" : "password"}
                  placeholder='Password'
                  onChange={changeHandler}
                  name='password'
                  value={formData.password}
                  className=' w-full p-2 rounded-md border border-black bg-transparent placeholder:text-black '
                />

                <span onClick={()=> setShowPassword2(prev => !prev)}
                  className='absolute right-3 top-2 '
                  >
                    {
                        showPassword2 ? (<FaEyeSlash size={20}/>) : (<FaEye size={20}/>)
                    }
                </span>  

             </label>

             <button className='bg-yellow-400 py-2 rounded-lg hover:bg-white '>
              <span className='font-semibold'>Sign in</span>
             </button>

             <span className='text-center cursor-pointer'>Don't have an Account?{" "}
              <NavLink to="/register">
              <span className='hover:text-white' >Create Account</span>
               </NavLink>
              </span>
             
         </form>
    </div>
  )
}

export default LoginForm