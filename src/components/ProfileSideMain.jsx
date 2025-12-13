import React from 'react'
import { CircleUserRound } from 'lucide-react'

const ProfileSideMain = () => {
  return (
    <div className= 'w-full ml-[383px] flex flex-col gap-y-6 justify-center items-center'>
         <div>
            <CircleUserRound size={80} color='gray'/>
         </div>

         <div className='text-3xl'>
          Profile
         </div>
    </div>
  )
}

export default ProfileSideMain