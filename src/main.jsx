import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
//Notificaciones
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';
import './i18n';


createRoot(document.getElementById('root')).render(
  <StrictMode>    
    <HelmetProvider>
      <Router >
        <App />
      </Router>
    </HelmetProvider>
      <Toaster />    
  </StrictMode>,
)