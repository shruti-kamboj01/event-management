import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  return (
    <div className='bg-yellow-50 h-[100vh]'>
   
     <Routes>
      <Route  path='/' element = {<Home/>} />
      <Route path='/login' element= {<Login/>}/>
      <Route path='/signup' element={<Signup/>} />
     </Routes>
    </div>
  )
}

export default App
