
import './App.css'

// components
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'

import { BrowserRouter, Route, Routes } from 'react-router'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Signin />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
