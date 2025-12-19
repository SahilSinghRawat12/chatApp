  import React, { useState } from 'react' 
  import { EllipsisVertical, User } from 'lucide-react'
  import { MessageSquareText } from 'lucide-react'
  import DropDown from './DropDown'
  import { useEffect , useRef } from 'react'
  import image1  from "../assets/image1.avif"
  import defaultAvatar from "../assets/defaultAvatar.png"
  import { Pencil } from 'lucide-react'
  import Button from './Button'
  import { ArrowLeft } from 'lucide-react'
  import { Check } from 'lucide-react'
  import { useNavigate } from 'react-router-dom'
  import { useAuth } from '../context/AuthContext'
  import { doc, updateDoc } from 'firebase/firestore'
  import {  db } from '../firebase/firebase'
   
  



  const ProfileSidebar = () => {

    //all hoooks at top

    const {userData} = useAuth();

    const navigate = useNavigate();

    const inputRef = useRef(null);

    const [editingName1 , setEditingName1] = useState(false);
    const [editingName2 , setEditingName2] = useState(false);

    const [fullNameInput , setFullNameInput] = useState("");

    const [status , setStatus] = useState("")

    const [image , setImage] = useState("");

    //sync input after userData arrives 
    useEffect(()=> {
       
      if(userData)
      {
         setFullNameInput(
          `${userData.firstname || ""} ${userData.lastname || ""}`.trim()
         )

         setStatus(userData.status || "Hey there I am using chatApp")
      }

    } , [userData]) 


    const goToHomeHandler = ()=>{
      navigate(-1);
    }

    const imageClickHandler = () => {
         inputRef.current.click();
    }

    const imageChangeHandler = (event) => {
        const file = event.target.files[0];
     
        setImage(file);
        
    }

    

    const updateHandler = async () => {
         
        const trimmedName = fullNameInput.trim();
        const splitName = trimmedName.split(" ");      
        
        const docRef = doc(db, "users" , userData.id);

         await updateDoc(docRef , {
          firstname : splitName[0],
          lastname : splitName.slice(1).join(" "),
          status : status
        })

        setEditingName1(false);        
        setEditingName2(false);        
    }
    
   

    return (
      <div> 
          <nav className='w-96 h-[100vh] fixed top-0 left-0 bg-[#141e2f]'>

            <div className='flex items-center justify-between'>
              <ArrowLeft className='text-3xl text-white mt-5 mx-5 cursor-pointer'
                onClick={goToHomeHandler}
              />
              <div className='text-3xl text-white mt-5 mx-5'>Profile</div>
            </div>

              <div className='my-10 flex items-center justify-center '>
                 {
                     image 
                     ? ( <img  src={URL.createObjectURL(image)} alt="profile" className='w-32 h-32 rounded-full cursor-pointer' onClick={imageClickHandler}/> ) 
                     
                     : (<img  src={defaultAvatar} alt="profile" className='w-32 h-32 rounded-full cursor-pointer' onClick={imageClickHandler}/> )
                 }

                  <input type='file' className='hidden' ref={inputRef} onChange={imageChangeHandler}/>
              </div>

            <div className='mx-6 mt-12 flex flex-col gap-y-12'>
            
              <div className='flex flex-col gap-y-5'>
                  <div className='text-gray-200 text-sm'>Name</div> 
                  <div className='flex justify-between items-center'>
                      
                   {
                       editingName1
                      ? (
                          <div>
                          <input 
                           value={fullNameInput}
                           onChange={(e)=>
                              setFullNameInput(e.target.value)
                           }
                           className='bg-white px-2 py-1 rounded text-black w-full'
                          />
                          </div>
                    
                    )
                      
                      : (<span className='text-white text-md'>{fullNameInput}</span>)
                   }
                                
                       <span title='click to edit' onClick={()=>setEditingName1(true)}>
                       <Pencil color='white' size={18} className='cursor-pointer'/>
                        </span>
                                    
                  </div>
              </div>

              <div className='flex flex-col gap-y-5'>
                  <div className='text-gray-200 text-sm'>About</div>
                  
                  <div className='flex justify-between items-center'>
                      
                    {
                       editingName2
                      ? (
                          <div>
                          <input 
                           value={status}
                           onChange={(e)=>
                              setStatus(e.target.value)
                           }
                           className='bg-white px-2 py-1 rounded text-black w-full'
                          />
                          </div>
                    
                    )
                      
                      : (<span className='text-white text-md'>{status}</span>)
                   }
                                              
                       <span title='click to edit' onClick={()=>setEditingName2(true)}>
                       <Pencil color='white' size={18} className='cursor-pointer'/>
                        </span>

                  </div>
              </div>
            </div>

              <div onClick={updateHandler}>
                <Button  />
              </div>

          </nav>
      </div>
    )
  }

  export default ProfileSidebar