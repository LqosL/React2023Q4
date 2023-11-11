import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SectionDetailsContainer from './components/SectionDetailsContainer';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import NotFound from "./components/NotFound";

const router: RemixRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
