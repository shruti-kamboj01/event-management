import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <div className='bg-yellow-50 h-[100vh]'>
   
     <Routes>
      <Route  path='/' element = {<Home/>} />
      <Route path='/login' element= {<Login/>}/>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
     </Routes>
    </div>
  )
}

export default App
