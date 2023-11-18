import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

import 'bootstrap/dist/css/bootstrap.css';
import 'boxicons';


import UserContext from './context/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </React.StrictMode>,
)
