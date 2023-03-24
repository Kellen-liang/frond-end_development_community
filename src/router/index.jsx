import { lazy } from "react";

const routes = [
  {
    path: '/login',
    element: lazy(() => import('@/page/Login')) 
  },
  {
    path: '/register',
    element: lazy(() => import('../page/Login')) 
  },
  {
    path: '/home',
    element: lazy(() => import('../page/Home')),
  },
  {
    path: '/inbox',
    element: lazy(() => import('../page/Inbox')),
  },
  {
    path: '/message',
    element: lazy(() => import('../page/Inbox')),
    children: [
      {
        path: 'user',
        element: lazy(() => import('../page/Message/User')),
      },
      {
        path: 'dynamic',
        element: lazy(() => import('../page/Message/Dynamic')),
      },
      {
        path: 'collections',
        element: lazy(() => import('../page/Message/Collections')),
      },
    ]
  },
  {
    path: '/creactionCenter',
    element: lazy(() => import('../page/CreactionCenter'))
  },
  {
    path: '/article',
    element: lazy(() => import('../page/Article'))
  },
  {
    path: '/',
    element: lazy(() => import('../page/Home'))
  }
]

export default routes