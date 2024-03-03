import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import Root from './root';
import HomePage from './pages/HomePage';
import NosotrosPage from './pages/NosotrosPage.tsx';
import Inventario from './pages/InventarioPage.tsx';
import Login, {action as loginAction} from './pages/LoginPage.jsx';
import Register from './pages/RegisterPage.jsx';
import Account from './pages/AccountPage.jsx';
import reportWebVitals from './reportWebVitals';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children : [
      {
        path : "/",
        element : <HomePage />,
      },
      {
        path : "/Nosotros",
        element : <NosotrosPage />
      },
      {
        path : "/Inventario",
        element : <Inventario />
      },
      {
        path : "/Login",
        element : <Login />,
        action : loginAction,
      },
      {
        path : "/Register",
        element : <Register />
      },
      {
        path : "/Account",
        element : <Account />
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
