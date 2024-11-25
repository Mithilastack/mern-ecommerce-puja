import { useState } from 'react'
import './App.css'
import Home from "./page/Home/Home"
import Cart from './page/Cart/Cart'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AllProducts from './components/AllProducts/AllProducts'
import Login from './page/Login/Login'
import Signup from './page/Signup/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/allproducts' element={<AllProducts />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />


      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
