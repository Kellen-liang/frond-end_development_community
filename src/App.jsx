import { useState } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import routes from './router'
import HeaderNav from './component/HeaderNav'
import './App.css'

function App() {
  const element = useRoutes(routes)
  const location = useLocation()
  console.log('location',location);
  return (
    <div className="App">
      { location.pathname !== '/login' && location.pathname !== '/register' && <HeaderNav/>}
      {element}
    </div>
  )
}

export default App
