import React, { useState } from 'react' 
import { EllipsisVertical } from 'lucide-react'
import { MessageSquareText } from 'lucide-react'
import DropDown from './DropDown'
import { useEffect , useRef } from 'react'
import SearchBar from './sidebarComponents/SearchBar'
import FriendList from './sidebarComponents/FriendList'
 
 

const Sidebar = ({setSelectedFriends , friendData , setChatId , isMobileChatOpen , setIsMobileChatOpen}) => {

    const [dropdown , setDropDown] = useState(false);
    const dropdownRef = useRef(null);
    
     //what user types stores in this
  const [searchText , setSearchText] = useState("");
 
 
    useEffect(()=>{
       const handleClickOutside = (event) =>{
          if(dropdownRef.current &&  !dropdownRef.current.contains(event.target))
          {
               setDropDown(false);
          }
       };

       document.addEventListener("mousedown" , handleClickOutside);

       return()=>{
          document.removeEventListener("mousedown" , handleClickOutside);
       };
    }, []);

    function dropdownHandler()
    {
             setDropDown(!dropdown);         
              
    }

     // decides which list to show
  const visibleFriends = 
     searchText.trim() === ""
     ? friendData
     : friendData.filter( (friend) => {
        const fullname = `${friend.firstname} ${friend.lastname}`.toLowerCase();
        return fullname.includes(searchText.toLowerCase());
     })
    

  return (
    <div> 
        <nav className={`w-full sm:w-80 md:w-96  h-full fixed top-0 left-0 bg-[#141e2f] flex flex-col
         ${isMobileChatOpen ? "hidden sm:block" : "sm:block"}`}>

              <div className='flex justify-between items-center my-5 mx-5'>
                   <div className='flex items-center gap-x-3 select-none'>
                        <MessageSquareText color='yellow' size={40} className='mt-2'/>
                       <h1 className='text-white text-4xl'>ChatApp</h1>
                   </div>

                   <div className='cursor-pointer relative ' ref={dropdownRef}  >
                        <EllipsisVertical color='white' onClick={dropdownHandler}/>
                        {
                         dropdown && 
                          (<div
                              className="
                                   absolute right-2 top-full mt-2 origin-top-right
                                   animate-dropdown z-50
                              "
                              >
                         <DropDown setDropDown={setDropDown}/>
                         </div>)
                         
                        }
                   </div>
              </div>

              {/* searchbar */}
              <div>
              <SearchBar searchText={searchText} setSearchText={setSearchText} />
              </div>

              {/* FriendList */}
              
                <FriendList
                  setSelectedFriends = {setSelectedFriends}
                  friendData = {visibleFriends}
                  setChatId = {setChatId}
                  setIsMobileChatOpen = {setIsMobileChatOpen}
                  
                 />
               
        </nav>
    </div>
  )
}

export default Sidebar