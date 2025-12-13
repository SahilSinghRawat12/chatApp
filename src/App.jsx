import React from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Setting from './pages/Setting'
import Profile from './pages/Profile'
import PrivateRoute from './routes/PrivateRoute'
 
 

 

function App() {
    

  return (
     <div>
          <Routes>

                {/* public routes */}
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />

                {/* private routes */}

                <Route path='/home' element={
                    <PrivateRoute>
                      <Home/>
                    </PrivateRoute>
                } />
                <Route path='/chat/:id' element={<Chat/>} />
                <Route path='/profile' element={<Profile/>} />
                
                {/* default redirect */}
                 <Route path="*" element={<Navigate to="/login" />} />

          </Routes>
     </div>
  )
}

export default App
