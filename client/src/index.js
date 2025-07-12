import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import './index.css';

// Axios Base Config
axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Mount App
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);

// Report performance
reportWebVitals();


