import React, { useEffect } from 'react'
import { CircleAlert } from 'lucide-react'
import profilePic from "../../assets/profilePic.jpg"

const ChatHeader = ({selectedFriends}) => {
  
  const fullName = `${selectedFriends.firstname} ${selectedFriends.lastname}`

  return (
    <div className='  flex items-center justify-between h-[70px] px-4 py-5 bg-white border-b border-gray-200'>

        {/* left part */}
         <div className='flex items-center gap-3'>
              <img src={selectedFriends.profilePic}
                className='w-10 h-10 rounded-full object-cover cursor-pointer'
              />

              <div className='flex items-center gap-2 cursor-default'>
                 <p>{fullName}</p>

                 <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
         </div>

         {/* right part */}
           <div className='cursor-pointer'>
              <CircleAlert />
           </div>

    </div>
  )
}

export default ChatHeader