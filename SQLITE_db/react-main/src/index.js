import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import {persistor,store}  from './redux/store/store'

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './redux/store/AuthContext';
import LoginIn from './sections/auth/login/loginIn';




// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL='http://localhost:3001/app'

root.render(
  <HelmetProvider>
    <BrowserRouter>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <AuthProvider>
      <App />
      
      <ToastContainer position="top-center" />
      </AuthProvider>
      </PersistGate>
      </Provider>
    </BrowserRouter>
  </HelmetProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
