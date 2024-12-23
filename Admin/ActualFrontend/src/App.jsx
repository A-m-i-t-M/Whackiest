import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Details from './pages/Details'
import LangingPage from './pages/LangingPage'
import BhaktSignin from './pages/BhaktSignin'
import BhaktHome from './pages/BhaktHome'
import BhaktSignup from './pages/BhaktSignup'
import Darshan from './pages/Darshan'
import Events from './pages/Events'
import DarshanBooking from './pages/DarshanBooking'
import ViewAllBookings from './pages/ViewAllBookings'
import ViewAdminStuff from './pages/ViewAdminStuff'
import MandirServiceBookClient from './pages/MandirServiceBookClient'
import AllLiveStreams from './pages/AllLiveStreams'
import WatchLiveStream from './pages/WatchLiveStream'
import Header from './components/Header'
import DonationPage from './pages/DonationForm'
import QuestionAndAnswers from './pages/QuestionAndAnswers'
import QnAform from './pages/QnAform'
import Answers from './pages/Answers'
import MandirForDonation from './pages/MandirForDonation'
import AdminQues from './pages/AdminQues'
import AdminAnswersQuestion from './pages/AdminAnswersQuestion'
export default function App() {
  return <>
    <Header/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LangingPage/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/review' element={<Details/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/bhakt/sign-in' element={<BhaktSignin/>}/>
        <Route path='/bhakt/home' element={<BhaktHome/>}/>
        <Route path='/bhakt/sign-up' element={<BhaktSignup/>}/>
        <Route path='/darshan' element={<Darshan/>}/>
        <Route path='/events' element={<Events/>}/>
        <Route path='/mandirbook' element={<DarshanBooking/>}/>
        <Route path='/view-bookings' element={<ViewAllBookings/>}/>
        <Route path='/view-admin-bookings' element={<ViewAdminStuff/>}/>
        <Route path='/mandir-service-book' element={<MandirServiceBookClient/>}/>
        <Route path='/select-livestream' element={<AllLiveStreams/>}/>
        <Route path='/watch-livestream' element={<WatchLiveStream/>}/>
        <Route path='/donation' element={<MandirForDonation/>}/>
        <Route path='/confirm-donation' element={<DonationPage/>}/>
        <Route path='/discussions' element={<QuestionAndAnswers/>}/>
        <Route path='/qna' element={<QnAform/>}/>
        <Route path='/answers' element={<Answers/>}/>
        <Route path='/admin-ques' element= {<AdminQues/>}/>
        <Route path='/adminanswers' element = {<AdminAnswersQuestion/>}/>
      </Routes>
    </BrowserRouter>
  </>
}