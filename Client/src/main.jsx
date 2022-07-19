import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ElectionProvider} from './Context/ElectionContext'
// import ElectionContext from './Context/ElectionContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ElectionProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ElectionProvider>
)
