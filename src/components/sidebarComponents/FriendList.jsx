import React from 'react'
import FreindItem from './FreindItem'

const FriendList = ({setSelectedFriends , friends}) => {
  return (
    <div className='flex-1 overflow-y-auto cursor-pointer  hide-scrollbar '>
       {
          friends.map( (friend) => (
             <FreindItem 
               key={friend.id}
               setSelectedFriends = {setSelectedFriends}
               friend = {friend}
             />
          ))
       }    
    </div>
  )
}

export default FriendList