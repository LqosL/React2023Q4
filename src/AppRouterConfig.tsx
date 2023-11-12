import {RouteObject} from "react-router-dom";
import AppContainer from "./AppContainer";
import SectionDetailsContainer from "./components/SectionDetailsContainer";
import NotFound from "./components/NotFound";
import React from "react";

export const AppRouterConfig: Array<RouteObject> = [
    {
        path: '/',
        element: <AppContainer/>,
        children: [
            {
                path: '/works/:key',
                element: <SectionDetailsContainer/>,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound/>,
    },
]