import React from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
 

const DropDown = ({setDropDown}) => {

const navigate = useNavigate();

const handleEditProfile = () => {
  setDropDown(false);
  navigate("/profile");
};

const logoutHandler = () => {
  
   signOut(auth)
     .then(()=>{
        toast.success("Logged Out");

        setTimeout(()=>{
           navigate("/login");
        }, 700);
     })

     .catch((error)=>{
      toast.error("Logout failed");
     })
}

  return (
    <div className='bg-white w-36 h-[120px] flex flex-col rounded-md p-3  gap-y-2   '>
        
        <div className='hover:bg-[#141e2f] hover:text-white hover:p-1 hover:rounded-md p-1 transition-all duration-150 ease-out'>
            <span onClick={handleEditProfile} >Edit Profile</span>
        </div>
        
        <div className='px-1'>
            <div className='h-px w-[80%] bg-black'></div>
        </div>

        <div className='hover:bg-[#141e2f] hover:text-white hover:p-1 p-1 hover:rounded-md transition-all duration-150 ease-out '
          onClick={logoutHandler}
        >
             <span>Logout</span>
        </div>
    </div>
  )
}

export default DropDown