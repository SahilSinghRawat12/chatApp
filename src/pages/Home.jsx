import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { ChatWindow } from '../components/chatWindow/ChatWindow';
import { dummyMessages } from '../data/dummyMessage';
import { useAuth } from '../context/AuthContext';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

 

const Home = () => {

  const {userData} = useAuth();

  const [selectedFriends , setSelectedFriends] = useState(null);
  const [messages , setMessages] = useState(dummyMessages);
  const [friendData , setFriendData] = useState([]);

  useEffect(()=>{

     const firestoreData = async () => {
       const querySnapshot = await getDocs(collection( db , "users"));
       querySnapshot.forEach( (doc) => {

         // doc.data() is never undefined for query doc snapshots
          setFriendData({ id: doc.id , ...doc.data()})
         
       }) }
       
  }, [])

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
      <Sidebar setSelectedFriends = {setSelectedFriends}
      friendData = {friendData}    
      />

      <ChatWindow 
      selectedFriends = {selectedFriends}
      messages = {messages[selectedFriends?.id] || []}
      sendHandler = {sendHandler}
      />
    </div>
  )
}

export default Home