import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Details from './pages/Details'
import LangingPage from './pages/LangingPage'

export default function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LangingPage/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/review' element={<Details/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  </>
}