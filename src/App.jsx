import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignOut from './pages/SignOut'
import Profile from './pages/Profile'
import About from './pages/about'

export default function App() {
  return (
   
 <BrowserRouter>
 
 <Routes>
  <Route path='/' element={<Home />}></Route>
  <Route path='/sign-in' element={<Signin />}></Route>
  <Route path='/sign-out' element={<SignOut />}></Route>
  <Route path='/about' element={<About />}></Route>
  <Route path='/profile' element={<Profile />}></Route>


 </Routes>
 </BrowserRouter>
    
   
   
  )
}
