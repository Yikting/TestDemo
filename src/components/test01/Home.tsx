import React from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import ComponentOne from './ComponentOne'
import ComponentTwo from './ComponentTwo'
import NotFound from './NotFound'

const Home = () => {

  return (
    <Routes>
      <Route path='/' element={<ComponentOne />} />
      <Route path='/two' element={<ComponentTwo />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Home