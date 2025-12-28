import React, { useEffect, useState } from 'react'
import { Send } from 'lucide-react'

const MessageInput = ({sendHandler , chatId}) => {

  const [formData , setFormData] = useState({
     message : "",
  }) 

  useEffect(()=>{
     formData.message = ""
  } , [chatId])

  function changeHandler(event)
  {
      setFormData((prevData)=>{
        return {
          ...prevData ,
          [event.target.name] : event.target.value
        }
      })
  }

  function submitHandler(event)
  {
     event.preventDefault();
     
     if(!formData.message.trim()) return; // avoid empty message

     sendHandler(formData.message);

      setFormData({message : ""}); // clear input after sending 
     
  }


  return (
    <div className='bg-white  w-full px-4 py-3 flex border-t items-center  '>
        <form onSubmit={submitHandler}  className='  w-full flex  items-center gap-3'>
            <input 
             type='text'
             placeholder='Send a message'
             onChange={changeHandler}
             name='message'
             value={formData.message}
            className="flex-1 bg-gray-100 p-2 rounded-lg outline-1 outline-gray-400"
            />

            <button type='submit'>
              <Send />
            </button>
        </form>

         
    </div>
  )
}

export default MessageInput