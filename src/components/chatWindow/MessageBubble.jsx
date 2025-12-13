import React  from 'react'

const MessageBubble = ({message }) => {

    const isMe = message.sender === "me";


  return (
     <div
       className={`w-full flex 
        ${isMe ? "justify-end" : "justify-start"} mb-2`} 
     >
          <div className={
            ` max-w-xs px-3 py-2 rounded-lg text-sm shadow 
            ${
                isMe ? "bg-blue-500 text-white rounded-br-none" 
                : "bg-gray-200 text-black rounded-bl-none"
            }`
          }>
              <p>{message.text}</p> 
              <span className='text-xs opacity-70 block text-right mt-1'>{message.time}</span>
          </div>
     </div> 
  )
}

export default MessageBubble