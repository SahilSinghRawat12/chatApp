import React from 'react'
import profilePic from "../../assets/profilePic.jpg"
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'


const FreindItem = ({friend , setSelectedFriends , setChatId }) => {

  const {userData} = useAuth();

  const friendListClickHandler = async () => {
    setSelectedFriends(friend);

    const chatId = [];
    chatId.push(userData.id , friend.id) ;
    const sortedId = chatId.sort();
    
    const singularChatId = sortedId.join("_");
 

    const docRef = doc(db , "chats" , singularChatId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists())
    {
       console.log("document data : " , docSnap.data());
    }

    else 
    {
        await setDoc(doc(db , "chats" , singularChatId), {
          participants : sortedId,
          createdAt : serverTimestamp(),
          lastMessage : "",
          lastMessageAt : serverTimestamp(), 
        });
    }
    

    setChatId(singularChatId);
    
  }
  
  return (
    <div className='flex gap-x-5 items-center  my-2 mx-3 rounded-md  hover:bg-gray-900  px-4 py-4 '
     onClick={friendListClickHandler} >
        <div>
            <img src={friend.profilePic} alt=""
            className='w-10 h-10 rounded-full'
             />
        </div>  

        <div className='flex flex-col text-white justify-center'>
            <span>{friend.firstname}</span>
            <span className='text-sm text-gray-400'>{friend.status}</span>
        </div>
    </div>
  )
}

export default FreindItem