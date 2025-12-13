import React from 'react'
import image from '../../assets/chatwindow.jpg'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import MessageInput from './MessageInput'
import SelectToChat from './SelectToChat'
 
 

export const ChatWindow = ({selectedFriends , messages , sendHandler}) => {

  if (!selectedFriends) {
  return (
    <SelectToChat/>
  );
}

  return (
    <div className='w-[calc(100vw-384px)] h-screen ml-96 flex flex-col '
     >
      
      <ChatHeader selectedFriends = {selectedFriends} />

  
    <div className="flex-1">
      <Messages 
      messages={messages}/>
    </div>
        

      <MessageInput sendHandler = {sendHandler}/>
    </div>
  )
}
