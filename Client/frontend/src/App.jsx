import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

export default function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<SignIn/>}/>
        <Route path='/sign-up' element = {<SignUp/>}/>
        <Route path='/home' element = {<Home/>}/>
      </Routes>
    </BrowserRouter>
  </>
}
