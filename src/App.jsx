import { useState, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import routes from './router'
import HeaderNav from './component/HeaderNav'
import 'antd/dist/antd';
import './App.css'


function App() {
  // console.log('routes',routes);
  return (
    <div className="App">

      {location.pathname !== '/login' && location.pathname !== '/register' && <HeaderNav />}
      <Routes>
        {
          routes.map((item, key) => (
            <Route
              key={key}
              path={item.path}
              element={
                //预加载显示
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
      </Routes>
    </div>
  )
}

export default App
