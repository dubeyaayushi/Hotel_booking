import React from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <div className='flex flex-col h-screen'>
            <Navbar/>
            <div className='flex h-full'>
                <Sidebar/>
                <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
                    <Outlet/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout

/* 🎯 Maan lo tumhare paas ye pages hain:
Home (/)

Products (/products)

Laptops (/products/laptops)

Mobiles (/products/mobiles)

About (/about)

🧠 Goal:
Products ek parent page hai. Uske andar Laptops aur Mobiles naam ke nested pages render karne hain ek hi layout ke andar.

Yahan pe <Outlet /> help karega nested pages ko parent ke andar dikhane mein.

 */