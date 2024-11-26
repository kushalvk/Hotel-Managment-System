import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './Components/Pages/Login/Login.jsx'
import SignUp from './Components/Pages/Sign Up/SignUp.jsx'
import Home from './Components/Pages/Home/Home.jsx'
import Booking from './Components/Pages/Booking/Booking.jsx';
import Gallery from './Components/Pages/Gallery/Gallery.jsx'
import Policies from './Components/Pages/Policies/Policies.jsx'
import PrivacyPolicy from './Components/Pages/PrivacyPolicy/PrivacyPolicy.jsx'
import TypeRoom from './Components/Pages/TypeRoom/TypeRoom.jsx'
import Careers from './Components/Pages/Careers/Careers.jsx'
import Facilities from './Components/Pages/Facilities/Facilities.jsx'
import BlogNews from './Components/Pages/BlogNews/BlogNews.jsx'
import Review from './Components/Pages/Review/Review.jsx'
import FAQ from './Components/Pages/FAQ/FAQ.jsx'
import Rating from './Components/Pages/Rating/Rating.jsx'
import TermsConditions from './Components/Pages/TermCondition/TermsCondition.jsx'
import ContactUs from './Components/Pages/ContactAs/ContactAs.jsx'
import AboutUs from './Components/Pages/AboutAs/AboutAs.jsx'
import MyBooking from './Components/Pages/MyBooking/MyBooking.jsx'
import UpdateBooking from './Components/Pages/Update Booking/UpdateBooking.jsx'
import MyProfile from './Components/Pages/MyProfile/MyProfile.jsx'
import ForgetPassword from './Components/Pages/Forget Password/ForgatePwd.jsx'
import Payment from './Components/Pages/Payment/Payment.jsx'
import AllUser from './Components/Pages/AllUser/AllUser.jsx'
import Invoice from './Components/Pages/Invoice/Invoice.jsx'
import ManuPage from './Components/Pages/Manu/Manu.jsx'

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
