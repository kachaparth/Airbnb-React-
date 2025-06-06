import { useState } from 'react'
import Listings from './component/listings'
import { Routes, Route } from 'react-router-dom'
import ListShow from './component/ListShow'
import New from './component/New'
function App() {
       return (
        <Routes>
          <Route path="/listings" element={<Listings/>} />
          <Route path="/listings/:id" element={<ListShow/>} />
          <Route path='/listings/new' element={<New/>} />
        </Routes>
       )
}

export default App
