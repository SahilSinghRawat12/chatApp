  import React, { useState } from 'react'
  import { FaEye } from "react-icons/fa";
  import { FaEyeSlash } from "react-icons/fa";
  import { NavLink, useNavigate } from 'react-router-dom'
  import {getAuth , createUserWithEmailAndPassword} from "firebase/auth"
  import {app} from "../firebase/firebase"
  import { toast } from 'react-toastify';
  import { doc , setDoc } from 'firebase/firestore';
  import { db } from '../firebase/firebase';
  
  // creating instance of auth or like connecting auth to the app
  const auth = getAuth(app); 

  const RegisterForm = () => {
      
  const [formData , setFormData] = useState(
          {
                firstname : "",
                lastname : "",
                email : "", 
                password : "",
                confirmPassword : "", 
          }
      )


  
  
  const [showPassword , setShowPassword] = useState(false);
  const [showPassword2 , setShowPassword2] = useState(false);
  const navigate = useNavigate();

    function changeHandler(event)
      {
          const {name , value } = event.target

          setFormData( (prevData) => {

              return {
                  ...prevData , 
                  [name] : value
              }
          })
      }
      
      
      
      function submitHandler(event)
      {
          event.preventDefault();

          if(formData.password !== formData.confirmPassword)
          {
            toast.error("Password does not match")
            return;
          }

          else  
          {
            createUserWithEmailAndPassword(auth , formData.email , formData.password)
            .then( async (value) => {
              
              //taken user from inside the value and stored in user variable 
               const user = value.user;  

               //save user data in firestore
               await setDoc(doc(db , "users" , user.uid), {
                   firstname : formData.firstname,
                   lastname : formData.lastname,
                   email : formData.email,
                   profilePic : "",
                   createdAt : new Date(),
                   online : true,
                   status : "Hey there I am using chat app",
               });

                toast.success("Account Created");
                
                setTimeout(() => {
                  navigate("/home")
                }, 700);

                })

              .catch( (error)=> {
               
                 const errorCode = error.code;

                 if(errorCode === "auth/email-already-in-use")
                 {
                   toast.error("Email already exists");
                 }  

                 else if(errorCode === "auth/invalid-email")
                 {
                    toast.error("Invalid email format");
                 }

                 else if(errorCode === "auth/weak-password")
                 {
                  toast.error("Password must be atleast 6 characters");
                 }

                 else 
                 {
                   toast.error("Something went wrong");
                 }
              });
          }

          
      }


  
    return (
      <div className='bg-[#7a98cd] w-[400px] h-[600px] rounded-md shadow-md'>

          <div className='flex flex-col items-center my-5'>
            <h1 className='text-3xl font-bold'>Create an account</h1>
            <span className='text-lg mt-2 font-semibold'>Already have an account?{" "} 
              <NavLink to="/login">
              <span className='underline hover:text-white  cursor-pointer'>Log in</span>
              </NavLink>
            </span>
          </div>

          <form onSubmit={submitHandler} 
          className='flex flex-col mt-10 px-5 gap-y-5'
          >
              <div className='flex flex-col gap-y-5 '>
                      {/* firstname */}

                      <label>
                          <input
                            required
                            type='text'
                            placeholder='Enter your first name'
                            name='firstname'
                            value={formData.firstname}
                            onChange={changeHandler}
                            className=' w-full p-2 rounded-md border border-black bg-transparent placeholder:text-black'
                          />
                      </label>

                      {/* lastname */}
                      <label>                 
                          <input 
                            required
                            type='text'
                            placeholder='Enter your last name'
                            name='lastname'
                            value={formData.lastname}
                            onChange={changeHandler}
                            className=' w-full p-2 rounded-md border border-black bg-transparent placeholder:text-black'
                          />
                      </label>
                  </div>


      {/* email */}
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
                    type= {showPassword ? "text" : "password"}
                    placeholder='Password'
                    onChange={changeHandler}
                    name='password'
                    value={formData.password}
                    className=' w-full p-2 rounded-md border border-black bg-transparent placeholder:text-black '
                  />

                  <span onClick={()=> setShowPassword(prev => !prev)}
                    className='absolute right-3 top-2 '
                    >
                      {
                          showPassword ? (<FaEyeSlash size={20}/>) : (<FaEye size={20}/>)
                      }
                  </span>  

                  </label>

              {/* confirm pass */}

              <label className='relative'>
                  <input
                    type= {showPassword2 ? "text" : "password"}
                    placeholder='Confirm Password'
                    onChange={changeHandler}
                    name='confirmPassword'
                    value={formData.confirmPassword}
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

                  {/* agree to terms and condition */}
            
              
            

              <button className='bg-yellow-400 py-2 rounded-lg hover:bg-white '>
                <span className='font-semibold'>Create Account</span>
              </button>

              </form>
      </div>
    )
  }

  export default RegisterForm