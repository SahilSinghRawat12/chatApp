import React from 'react'
import profilePic from "../../assets/profilePic.jpg"

const FreindItem = ({friend , setSelectedFriends}) => {
  return (
    <div className='flex gap-x-5 items-center  my-2 mx-3 rounded-md  hover:bg-gray-900  px-4 py-4 '
     onClick={ ()=> setSelectedFriends(friend) }
    >
        <div>
            <img src={friend.profilePic} alt=""
            className='w-10 h-10 rounded-full'
             />
        </div>  

        <div className='flex flex-col text-white justify-center'>
            <span>{friend.name}</span>
            <span className='text-sm text-gray-400'>{friend.lastMessage}</span>
        </div>
    </div>
  )
}

export default FreindItem