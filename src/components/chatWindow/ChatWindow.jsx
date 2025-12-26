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
     if(!chatId) return;

     console.log("chatId" , chatId , typeof(chatId));
     
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
