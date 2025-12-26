import React from 'react'
import FreindItem from './FreindItem'

const FriendList = ({setSelectedFriends , friendData , setChatId}) => {
  return (
    <div className='flex-1 overflow-y-auto cursor-pointer  hide-scrollbar '>
       {
          friendData.map( (friend) => (
             <FreindItem 
               key={friend.id}
               setSelectedFriends = {setSelectedFriends}
               friend = {friend}
               setChatId = {setChatId}
             />
          ))
       }    
    </div>
  )
}

export default FriendList