import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { ChatWindow } from '../components/chatWindow/ChatWindow';
import { dummyMessages } from '../data/dummyMessage';
 

const Home = () => {

  const [selectedFriends , setSelectedFriends] = useState(null);
  const [messages , setMessages] = useState(dummyMessages);

  function sendHandler(text)
  {
       if(!selectedFriends) return;

      const newMessages = {
          id : Date.now(),
          sender : "me",
          text,
          time: "Now",
      }

       setMessages((prev)=>(
      {
         ...prev ,
         [selectedFriends.id] : [...prev[selectedFriends.id] , newMessages],  
      }
        ));
  }

 

  return (
    <div className='h-screen flex'>
      <Sidebar setSelectedFriends = {setSelectedFriends} />

      <ChatWindow 
      selectedFriends = {selectedFriends}
      messages = {messages[selectedFriends?.id] || []}
      sendHandler = {sendHandler}
      />
    </div>
  )
}

export default Home