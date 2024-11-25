import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './Components/Login/Login.jsx'
import SignUp from './Components/SignUp/SignUp.jsx'
import Home from './Components/Home/Home.jsx'
import Booking from './Components/Booking/Booking.jsx';
import Gallery from './Components/Gallery/Gallery.jsx'
import Policies from './Components/Policies/Policies.jsx'
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy.jsx'
import TypeRoom from './Components/TypeRoom/TypeRoom.jsx'
import Careers from './Components/Careers/Careers.jsx'
import Facilities from './Components/Facilities/Facilities.jsx'
import BlogNews from './Components/BlogNews/BlogNews.jsx'
import Review from './Components/Review/Review.jsx'
import FAQ from './Components/FAQ/FAQ.jsx'
import Rating from './Components/Rating/Rating.jsx'
import TermsConditions from './Components/TermCondition/TermsCondition.jsx'
import ContactUs from './Components/ContactAs/ContactAs.jsx'
import AboutUs from './Components/AboutAs/AboutAs.jsx'
import MyBooking from './Components/MyBooking/MyBooking.jsx'
import UpdateBooking from './Components/Update Booking/UpdateBooking.jsx'
import MyProfile from './Components/MyProfile/MyProfile.jsx'
import ForgetPassword from './Components/Forget Password/ForgetPwd.jsx'
import Payment from './Components/Payment/Payment.jsx'
import AllUser from './Components/AllUser/AllUser.jsx'
import Invoice from './Components/Invoice/Invoice.jsx'
import ManuPage from './Components/Manu/Manu.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='booking' element={<Booking />} />
      <Route path='gallery' element={<Gallery />} />
      <Route path='policies' element={<Policies />} />
      <Route path='privacyPolicy' element={<PrivacyPolicy />} />
      <Route path='typeroom' element={<TypeRoom />} />
      <Route path='careers' element={<Careers />} />
      <Route path='facilities' element={<Facilities />} />
      <Route path='blognews' element={<BlogNews />} />
      <Route path='reviews' element={<Review />} />
      <Route path='faq' element={<FAQ />} />
      <Route path='rating' element={<Rating />} />
      <Route path='termscondition' element={<TermsConditions />} />
      <Route path='contactas' element={<ContactUs />} />
      <Route path='aboutus' element={<AboutUs />} />
      <Route path='mybooking' element={<MyBooking />} />
      <Route path='updatebooking' element={<UpdateBooking />} />
      <Route path='myprofile' element={<MyProfile />} />
      <Route path='forgetpwd' element={<ForgetPassword />} />
      <Route path='payment' element={<Payment />} />
      <Route path='allusers' element={<AllUser />} />
      <Route path='invoice' element={<Invoice />} />
      <Route path='manu' element={<ManuPage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
