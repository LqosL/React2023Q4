import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SectionDetailsContainer from './components/SectionDetailsContainer';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import NotFound from "./components/NotFound";
import AppContainer from "./AppContainer";

const router: RemixRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer />,
    children: [
      {
        path: '/works/:key',
        element: <SectionDetailsContainer />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
