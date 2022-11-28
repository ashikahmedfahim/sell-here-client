import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UtilityPovider from './Contexts/UtilityPovider/UtilityPovider';
import AuthProvider from './Contexts/AuthPovider/AuthPovider';
import { BrowserRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UtilityPovider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </UtilityPovider>
    </QueryClientProvider>
  </React.StrictMode>
);
