import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'normalize.css'
import './index.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import axios from 'axios'
import { AuthContextProvider } from './context/authContext.jsx'
// axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AuthContextProvider>
  // </React.StrictMode>,
)
