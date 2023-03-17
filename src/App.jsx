import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import HeaderNav from './component/HeaderNav'
import './App.css'

function App() {
  const element = useRoutes(routes)
  return (
    <div className="App">
      <HeaderNav/>
      {element}
    </div>
  )
}

export default App
