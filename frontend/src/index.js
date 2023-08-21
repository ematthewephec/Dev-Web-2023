import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Importez Provider
import { createStore } from 'redux'; // Importez createStore
import rootReducer from './reducer/AuthReducer'; // Importez votre rootReducer
import App from './pages/app/App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>
);

reportWebVitals();
