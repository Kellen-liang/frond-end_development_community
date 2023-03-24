import { useState, Suspense } from 'react'
import { Routes, Route, useRoutes, useLocation } from 'react-router-dom'
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
      {/* <Routes>
        {
          element.map((item, key) => (
            <Route 
              key={key}
              path={item.path}
              element={
                <Suspense
                  fallback={
                    <div>正在加载中...</div>
                  }
                >
                  <item.element />
                </Suspense>
              }
                
            />
          ))
        }
      </Routes> */}
     
      {/* {element} */}
    </div>
  )
}

export default App
