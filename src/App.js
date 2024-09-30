import React from 'react'
import './App.css'
import Controls from './Controls.js'
import Details from './Details.js'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

/*
 * This app will contain two components, a toggle and a button
 * When the toggle is off, the button will be disabled
 * When the toggle is on, the button will be enabled
 *
 * When the toggle is flipped, a note will be sent to the console (to emulate
 * hitting the database)
 * When the button is pressed, a note will be sent to the console
 */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Controls />}></Route>
        <Route path='/details/:id' element={<Details />}></Route>
        <Route path='*' element={<Navigate to='/' />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
