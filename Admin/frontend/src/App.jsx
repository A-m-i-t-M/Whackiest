import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'

export default function App() {
  return <>
    {/* // <div>App</div> */}
    <BrowserRouter>
      {/* <Header/> */}
      <Routes>
        <Route path = '/sign-up' element = {<SignUp/>}> </Route>
        <Route path = '/sign-in' element = {<SignIn/>}> </Route>
      </Routes>
    </BrowserRouter>
    </>
}
