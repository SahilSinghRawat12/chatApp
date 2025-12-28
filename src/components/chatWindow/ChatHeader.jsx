import React, { useEffect, useRef, useState } from 'react'
import { CircleAlert } from 'lucide-react'
import profilePic from "../../assets/profilePic.jpg"
import ClearDropDown from './ClearDropDown'


const ChatHeader = ({selectedFriends , onClearChat}) => {
  
  const dropdownRef = useRef(null);
  const fullName = `${selectedFriends.firstname} ${selectedFriends.lastname}`

  const [clearChatDropDown , setClearChatDropDown] = useState(false);

  function clearChatHandler()
  {
     setClearChatDropDown(!clearChatDropDown);
  }

      useEffect(()=>{
         const handleClickOutside = (event) =>{
            if(dropdownRef.current &&  !dropdownRef.current.contains(event.target))
            {
                 setClearChatDropDown(false);
            }
         };
  
         document.addEventListener("mousedown" , handleClickOutside);
  
         return()=>{
            document.removeEventListener("mousedown" , handleClickOutside);
         };
      }, []);
  

  return (
    <div className='  flex items-center justify-between h-[70px] px-4 py-5 bg-white border-b border-gray-200'>

        {/* left part */}
         <div className='flex items-center gap-3'>
              <img src={selectedFriends.profilePic}
                className='w-10 h-10 rounded-full object-cover cursor-pointer'
              />

              <div className='flex items-center gap-2 cursor-default'>
                 <p>{fullName}</p>

                 {/* { selectedFriends.online 
                        ? (<div className="w-2 h-2 bg-green-400 rounded-full"></div>)
                        : (<div className="w-2 h-2 bg-gray-500 rounded-full"></div>)
                  } */}
              </div>
         </div>

         {/* right part */}
           <div className='cursor-pointer relative' ref={dropdownRef}>
              <CircleAlert onClick={clearChatHandler}/>
               {
                   clearChatDropDown && 
                         ( <div
                              className="
                                   absolute top-full mt-1 right-3 
                                   animate-dropdown z-50
                              "
                              >
                         <ClearDropDown 
                         setClearChatDropDown = {setClearChatDropDown}
                         onClearChat = {onClearChat}
                         />
                         </div> )
                         
                        }
           </div>

    </div>
  )
}

export default ChatHeader