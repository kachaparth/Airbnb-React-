import { useState } from 'react'
import Listings from './component/listings'
import { Routes, Route, Router } from 'react-router-dom'
import ListShow from './component/ListShow'
import New from './component/New'
import Edit from './component/edit'
import Navbar from './component/Navbar'
import "./index.css"
import Footer from './component/footer'
import ErrorPage from './component/ErrorPage'
function App() {
       return (
         
        <>
          <Navbar/>
        <div className='p-4' style={
          {
            zIndex:0,
            padding:"15px 5px"
          }
        }>
        <Routes>
          <Route path="/listings" element={<Listings/>} />
          <Route path="/listings/:id" element={<ListShow/>} />
          <Route path='/listings/new' element={<New/>} />
          <Route path='/listings/:id/edit' element={<Edit/>}/>
          <Route path="/listings/error" element={<ErrorPage />} />
        </Routes>
        </div>
        <Footer/>
        </>
       )
}

export default App
