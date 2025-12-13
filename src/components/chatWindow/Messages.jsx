import React, { useEffect, useRef, useState } from "react";
 
import MessageBubble from "./MessageBubble";

const Messages = ({messages}) => {
  
  

  return (
    <div className="flex-1 h-full relative bg-[#f0f3fe] flex flex-col">
 
  

      {/* scrollable area */}
      <div
       className="flex-1 overflow-y-auto px-4 py-4 thin-scrollbar"
      >
        {messages.map((msg) => (
          <MessageBubble 
          key={msg.id}  
          message={msg} 
           />
        ))}

      
      </div>
 

      
    </div>
  );
};

export default Messages;
