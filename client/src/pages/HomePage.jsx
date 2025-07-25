import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { userDummyData } from '../assets/assets'

const HomePage = () => {
  const [users, setUsers] = useState(userDummyData)
  const [selectedUser, setSelectedUser] = useState(null)

  // Mark messages as read for selected user
  const handleUserSelect = (user) => {
    // Update users: set unreadCount = 0 for selected user
    const updatedUsers = users.map(u =>
      u._id === user._id ? { ...u, unreadCount: 0 } : u
    )
    setUsers(updatedUsers)
    setSelectedUser(user) 
  }

  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl 
        overflow-hidden h-[100%] grid grid-cols-1 relative ${
          selectedUser
            ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
            : 'md:grid-cols-2'
        }`}
      >
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}  />
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser}  />
        <RightSidebar  selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      </div>
    </div>
  )
}

export default HomePage
