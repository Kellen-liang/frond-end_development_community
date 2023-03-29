import { lazy } from "react";

const routes = [
  {
    path: '/login',
    element: lazy(() => import('@/page/Login')) 
  },
  {
    path: '/register',
    element: lazy(() => import('@/page/Login')) 
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
    path: '/article',
    element: lazy(() => import('@/page/Article'))
  },
  // {
  //   path: '/userCenter',
  //   element: lazy(() => import('@/page/UserCenter')),
  //   children: [
  //     {
  //       path: 'editUserInfo',
  //       element: lazy(() => import('@/page/UserCenter/EditUserInfo')),
  //     }
  //   ]
  // },
  {
    path: '/userCenter',
    element: lazy(() => import('@/page/UserCenter')),
  },
  {
    path: '/userCenter/editUserInfo',
    element: lazy(() => import('@/page/UserCenter/EditUserInfo')),
  },
  {
    path: '/',
    element: lazy(() => import('@/page/Home'))
  }
]

export default routes