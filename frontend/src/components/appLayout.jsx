import React from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'

const Applayout = () => {
  const location = useLocation();

  const hideRoutes = [
    '/login',
    '/signup',
    '/booking',
    '/postproperty'  
  ]
  const shouldHideHeaderFooter = hideRoutes.includes(location.pathname);
  return (
    <div className=''>
        {!shouldHideHeaderFooter && <Header/>}
        <Outlet/>
        {!shouldHideHeaderFooter && <Footer/>}
    </div>
  )
}

export default Applayout