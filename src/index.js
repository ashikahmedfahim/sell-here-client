import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UtilityPovider from './Contexts/UtilityPovider/UtilityPovider';
import AuthProvider from './Contexts/AuthPovider/AuthPovider';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UtilityPovider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </UtilityPovider>
  </React.StrictMode>
);
