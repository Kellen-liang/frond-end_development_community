import { useState, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import routes from './router'
import HeaderNav from './component/HeaderNav'
import Loading from './component/Loading'
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
                    <Loading style={{height: 'calc(100vh - 100px)', paddingTop: 200}}/>
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
