import React from 'react'


const ClearDropDown = ({setClearChatDropDown , onClearChat}) => {

    function clickHandler()
    {
        onClearChat();
        
        setClearChatDropDown(false);
    }
 
  return (
    <div className='bg-gray-300 text-black w-36 h-[50px] rounded-md py-2 text-center '>
        
        <div className='hover:bg-gray-400 hover:text-black hover:p-1 hover:rounded-md p-1 transition-all duration-150 ease-out'>
            <button onClick={clickHandler}>Clear Chat</button>
        </div>
        
    </div>
  )
}

export default ClearDropDown;