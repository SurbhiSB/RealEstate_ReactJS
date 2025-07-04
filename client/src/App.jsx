import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/about'
import Header from './Components/header'

export default function App() {
  return (
   
 <BrowserRouter>
<Header />
 
 <Routes>
  <Route path='/' element={<Home />}></Route>
  <Route path='/sign-in' element={<Signin />}></Route>
  <Route path='/sign-up' element={<SignUp />}></Route>
  <Route path='/about' element={<About />}></Route>
  <Route path='/profile' element={<Profile />}></Route>


 </Routes>
 </BrowserRouter>
    
   
   
  )
}
