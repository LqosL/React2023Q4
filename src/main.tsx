import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Router as RemixRouter } from '@remix-run/router/dist/router';
import LiveForm from "./LiveForm";
import RefForm from "./RefForm";

const router: RemixRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/liveform',
        element: <LiveForm />,
    },
    {
        path: '/refform',
        element: <RefForm />,
    },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

