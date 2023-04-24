import { useState } from 'react'
import Home from './pages/home'
import { RouterProvider } from 'react-router-dom'
import { routers } from './router'
import LoginProvider from './context/loginContext'

function App() {
  return (
    <LoginProvider>
      <RouterProvider router={routers} />
    </LoginProvider>
  )
}

export default App
