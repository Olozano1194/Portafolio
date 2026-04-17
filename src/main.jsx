import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
//Notificaciones
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';
import './i18n';


createRoot(document.getElementById('root')).render(
  <StrictMode>    
      <Router >
        <App />
      </Router>
      <Toaster />    
  </StrictMode>,
)