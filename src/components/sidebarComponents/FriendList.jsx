import React from 'react'
import FreindItem from './FreindItem'

const FriendList = ({setSelectedFriends , friendData , setChatId , setIsMobileChatOpen}) => {
  return (
    <div className='flex-1 overflow-y-auto cursor-pointer flex-wrap  hide-scrollbar '>
       {
          friendData.map( (friend) => (
             <FreindItem 
               key={friend.id}
               setSelectedFriends = {setSelectedFriends}
               friend = {friend}
               setChatId = {setChatId}
               setIsMobileChatOpen = {setIsMobileChatOpen}
             />
          ))
       }    
    </div>
  )
}

export default FriendList