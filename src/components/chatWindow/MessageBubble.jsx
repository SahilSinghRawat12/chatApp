import React, { useEffect }  from 'react'
import { useAuth } from '../../context/AuthContext';

const MessageBubble = ({message }) => {

  const {userData} = useAuth();
  const isMe = message.senderId === userData?.id;
  

  const time = 
    message.createdAt 
      ? message.createdAt.toDate().toLocaleTimeString([] , {
        hour : "2-digit",
        minute : "2-digit",
      })
      : "";

  return (
     <div
       className={`w-full flex 
        ${isMe ? "justify-end" : "justify-start"} mb-2`} 
     >
          <div className={
            ` max-w-xs px-3 py-2 rounded-lg text-sm shadow 
            ${
                isMe ? "bg-blue-500 text-white rounded-br-none " 
                : "bg-gray-200 text-black rounded-bl-none " 
            }`
          }>
              <p>{message.text}</p> 
              <span className='text-xs opacity-70 block text-right mt-1'>{time}</span>
          </div>
     </div> 
  )
}

export default MessageBubble