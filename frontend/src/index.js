import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import Root from './root';
import HomePage from './components/HomePage';
import NosotrosPage from './components/NosotrosPage.tsx';
import Inventario from './components/Inventario.tsx';
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
