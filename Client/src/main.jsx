import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './Component/Login/Login.jsx'
import SignUp from './Component/SignUp/SignUp.jsx'
import Home from './Component/Home/Home.jsx'
import Booking from './Component/Booking/Booking.jsx';
import Gallery from './Component/Gallery/Gallery.jsx'
import Policies from './Component/Policies/Policies.jsx'
import PrivacyPolicy from './Component/PrivacyPolicy/PrivacyPolicy.jsx'
import TypeRoom from './Component/TypeRoom/TypeRoom.jsx'
import Careers from './Component/Careers/Careers.jsx'
import Facilities from './Component/Facilities/Facilities.jsx'
import BlogNews from './Component/BlogNews/BlogNews.jsx'
import Review from './Component/Review/Review.jsx'
import FAQ from './Component/FAQ/FAQ.jsx'
import Rating from './Component/Rating/Rating.jsx'
import TermsConditions from './Component/TermCondition/TermsCondition.jsx'
import ContactUs from './Component/ContactAs/ContactAs.jsx'
import AboutUs from './Component/AboutAs/AboutAs.jsx'
import MyBooking from './Component/MyBooking/MyBooking.jsx'
import UpdateBooking from './Component/Update Booking/UpdateBooking.jsx'
import MyProfile from './Component/MyProfile/MyProfile.jsx'
import ForgetPassword from './Component/Forget Password/ForgetPwd.jsx'
import Payment from './Component/Payment/Payment.jsx'

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
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
