import React from 'react'
import ProfileSidebar from '../components/ProfileSidebar'
import ProfileSideMain from '../components/ProfileSideMain'

const Profile = () => {
  return (
    <div className='flex h-screen w-full'>
         <ProfileSidebar />
         <ProfileSideMain />
    </div>
  )
}

export default Profile