import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './pages/app/App';
import { AuthProvider } from '../src/components/Auth/Auth'; // Importez le AuthProvider
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/*<BrowserRouter>*/}
            <AuthProvider> {/* Enveloppez App avec AuthProvider */}
                <App />
            </AuthProvider>
        {/*</BrowserRouter>*/}
    </React.StrictMode>
);

reportWebVitals();
