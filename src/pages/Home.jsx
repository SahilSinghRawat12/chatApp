import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { ChatWindow } from '../components/chatWindow/ChatWindow';
import { dummyMessages } from '../data/dummyMessage';
import { useAuth } from '../context/AuthContext';
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
 

const Home = () => {

  const {userData} = useAuth();

  const [selectedFriends , setSelectedFriends] = useState(null);
  const [friendData , setFriendData] = useState([]);
  const [chatId , setChatId] = useState(null);
 

  useEffect(()=>{

     const fetchUsers = async () => {
       const querySnapshot = await getDocs(collection( db , "users"));

        const users = [];

       querySnapshot.forEach( (doc) => {
        
        //skip logged in user
        if(doc.id !== userData?.id)
        {
            // doc.data() is never undefined for query doc snapshots
            users.push({id: doc.id , ...doc.data()});
        }
         
         
        
          setFriendData(users)
       }) };
       
        if(userData)
        {
           fetchUsers();
        }
  }, [userData])


  async function sendHandler(text)
  {
       if(!selectedFriends) return;

      // add messages document in firestore -> which will contain messages 
      await addDoc(
         collection(db , "messages" , chatId , "chat"),
         {
             text : text,
             senderId : userData.id,
             createdAt : serverTimestamp(),
         }
      );

      // updating the chats document -> which wil update the lastmessage and lastmessageAt
      await updateDoc(
         doc(db , "chats" , chatId),
         {
           lastMessage : text,
           lastMessageAt : serverTimestamp(),
         }
      );
      
  }

 

  return (
    <div className='h-screen flex'>
      <Sidebar setSelectedFriends = {setSelectedFriends}
      friendData = {friendData}  
      setChatId = {setChatId}  
      />

      <ChatWindow 
      selectedFriends = {selectedFriends}
      sendHandler = {sendHandler}
      chatId = {chatId}
      />
    </div>
  )
}

export default Home