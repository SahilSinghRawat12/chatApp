import React, { useEffect, useState } from 'react'
import image from '../../assets/chatwindow.jpg'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import MessageInput from './MessageInput'
import SelectToChat from './SelectToChat'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore' 
import { db } from '../../firebase/firebase'
 
 

export const ChatWindow = ({selectedFriends  , sendHandler , chatId}) => {


  const [ messages , setMessages ] = useState([]);

  useEffect(()=> {

     // if no chat is selected do nothing 
     if(!chatId) {
        setMessages([]);
        return;
     }
 
     //clear old messagees immediately
     setMessages([]);
     
     // reference message of this chat
     const messageRef = collection(db , "messages" , chatId , "chat");

     // order message by time
     const q = query(messageRef , orderBy("createdAt"));
     
     //realtime listener
     // q is which chat to watch , snapshot -> latest message whenever someting changes
     const unsubscribe = onSnapshot(q , (snapshot) => {

      // Convert Firebase messages into normal JavaScript objects
      const msgs = snapshot.docs.map((doc)=> ({
          id: doc.id,
          ...doc.data()
        }));

        setMessages(msgs);
     }) 

     //cleanup listener when chat changes old listener is stops and new starts 
     return () => unsubscribe();

  } , [chatId]);

  if (!selectedFriends) {
  return (
    <SelectToChat/>
  );
}

  function clearChatHandler()
  {
    setMessages([]);
  }

  return (
    <div className='w-[calc(100vw-384px)] h-screen ml-96 flex flex-col '
     >
      
      <ChatHeader 
      selectedFriends = {selectedFriends} 
      onClearChat = {clearChatHandler}
      />

  
    <div className="flex-1 overflow-y-auto">
      <Messages 
      messages={messages}/>
    </div>
        
    <div className='shrink-0'>
         <MessageInput sendHandler = {sendHandler}
         chatId = {chatId}
         />
    </div>

    </div>
  )
}
