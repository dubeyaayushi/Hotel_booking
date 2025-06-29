import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
import HotelReg from './components/HotelReg'
import Layout from './pages/hotelOwner/Layout'
import Dashboard from './pages/hotelOwner/Dashboard'
import AddRoom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom'
import ProtectedRoute from './components/ProtectRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
const App = () => {

   const location = useLocation();

  const isOwnerPath = useLocation().pathname.includes("owner")


  return (
    <div>
     {!isOwnerPath && <Navbar/>}
     {false && <HotelReg/>}
     <div className='min-h-[70vh]'>
     
    <Routes>
      {/* public routes */}
      <Route path ='/' element={<Home/>}/>
      <Route path='/rooms' element={<AllRooms/>}/>
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/rooms/:id' element={<RoomDetails/>}/>


      {/* protected routes User Routes */}
       <Route element={<ProtectedRoute />}>
      <Route path='/my-bookings' element={<MyBookings/>}/> 
      </Route>

       {/* hotel owner routes */}
        <Route element={<ProtectedRoute roles={['owner', 'admin']} />}>
      <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-room' element={<AddRoom/>}/>
          <Route path="list-room" element={<ListRoom/>}/>
      </Route>
      </Route>
      
    </Routes>
     </div>
     <Footer/>
    </div>
  )
}

export default App