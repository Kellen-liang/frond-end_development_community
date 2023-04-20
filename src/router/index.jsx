import { lazy } from "react";

const routes = [
  {
    path: '/login',
    element: lazy(() => import('@/page/Login')) 
  },
  {
    path: '/register',
    element: lazy(() => import('@/page/Register')) 
  },
  {
    path: '/home',
    element: lazy(() => import('@/page/Home')),
  },
  {
    path: '/inbox',
    element: lazy(() => import('@/page/Inbox')),
  },
  {
    path: '/message',
    element: lazy(() => import('@/page/Message')),
  },
  {
    path: '/creactionCenter',
    element: lazy(() => import('@/page/CreactionCenter'))
  },
  {
    path: '/article/:id',
    element: lazy(() => import('@/page/Article'))
  },
  {
    path: '/meditor',
    element: lazy(() => import('@/page/Meditor'))
  },
  {
    path: '/userCenter/:id',
    element: lazy(() => import('@/page/UserCenter')),
  },
  {
    path: '/userCenter/editUserInfo/:id',
    element: lazy(() => import('@/page/UserCenter/EditUserInfo')),
  },
  {
    path: '/',
    element: lazy(() => import('@/page/Login'))
  }
]

export default routes