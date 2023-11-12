import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Router as RemixRouter} from '@remix-run/router/dist/router';
import {AppRouterConfig} from "./AppRouterConfig";

const router: RemixRouter = createBrowserRouter(AppRouterConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
