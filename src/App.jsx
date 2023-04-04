import { useState, Suspense } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import routes from './router'
import HeaderNav from './component/HeaderNav'
import Loading from './component/Loading'
import 'antd/dist/antd';
import './App.css'


function App() {
  const location = useLocation()
  // console.log('location',location);
  // console.log('routes',routes);
  return (
    <div className="App">

      {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/meditor' && <HeaderNav />}
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
          //带有嵌套路由
          // routes.map((item, key) => {
          //   if (item?.children?.length) {
          //     console.log(item?.children);
          //     console.log(item?.children?.length);
          //     return (
          //       <Route
          //         key={key}
          //         path={item.path}
          //         element={
          //           //预加载显示
          //           <Suspense
          //             fallback={
          //               <Loading style={{ height: 'calc(100vh - 100px)', paddingTop: 200 }} />
          //             }
          //           >
          //             <item.element />
          //           </Suspense>
          //         }
          //       >
          //         {item.children.map((childrenItem, key) => (
          //           <Route
          //             key={key}
          //             path={item.path + childrenItem.path}
          //             element={
          //               //预加载显示
          //               <Suspense
          //                 fallback={
          //                   <Loading style={{ height: 'calc(100vh - 100px)', paddingTop: 200 }} />
          //                 }
          //               >
          //                 <childrenItem.element />
          //               </Suspense>
          //             }
          //           />
          //         ))}
          //       </Route>
          //     )
          //   } else {
          //     return (
          //       <Route
          //         key={key}
          //         path={item.path}
          //         element={
          //           //预加载显示
          //           <Suspense
          //             fallback={
          //               <Loading style={{ height: 'calc(100vh - 100px)', paddingTop: 200 }} />
          //             }
          //           >
          //             <item.element />
          //           </Suspense>
          //         }
          //       />
          //     )
          //   }
          // })
        }
        <Route path='*' element={<Navigate to='/' />}/>
      </Routes>
    </div>
  )
}

export default App
