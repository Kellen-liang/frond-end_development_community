import { Navigate } from "react-router-dom";

import Home from '../page/Home';
import Message from '../page/Message';
import User from '../page/Message/User';
import Dynamic from '../page/Message/Dynamic'
import Collections from '../page/Message/Collections';
import Inbox from '../page/Inbox'
import CreactionCenter from '../page/CreactionCenter';
import Article from '../page/Article'

const routes = [
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/inbox',
    element: <Inbox />,
  },
  {
    path: '/message',
    element: <Message />,
    children: [
      {
        path: 'user',
        element: <User />,
      },
      {
        path: 'dynamic',
        element: <Dynamic />,
      },
      {
        path: 'collections',
        element: <Collections />,
      },
    ]
  },
  {
    path: '/creactionCenter',
    element: <CreactionCenter />
  },
  {
    path: '/article',
    element: <Article />
  },
  {
    path: '/',
    element: <Navigate to='/home' />
  }
]

export default routes