import React from 'react'
import NavBar from '../Navbar/NavBar'
import Footer from '../Footer/Footer'

function Layout({children, totalQuantity}) {

  // console.log(totalQuantity)

  return (
    <div>
      <NavBar />
      <div className='content'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
