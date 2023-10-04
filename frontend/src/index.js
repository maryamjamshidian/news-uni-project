import React from 'react';
import ReactDOM from 'react-dom/client';
import "bulma/css/bulma.css";
import './index.css';
import App from './App';
import { AuthContextProvider } from './admin/context/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
     <App />
    </AuthContextProvider>
  </React.StrictMode>
);

