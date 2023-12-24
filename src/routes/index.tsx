import {renderRoutes} from "./generate-routes";
import AnonymousLayout from "../layouts/AnonymousLayout";
import HomeLayout from "../layouts/HomeLayout";

import {lazy} from "react";
const Login = lazy(() => import("../views/Auth/Login/index"));
const Register = lazy(() => import("../views/Auth/Register/index"));
const Home = lazy(() => import("../views/Home/index"));
const Detail = lazy(() => import("../views/Detail/index"));


export const routes = [
    {
        layout: AnonymousLayout,
        routes: [
            {
                name: 'auth',
                title: 'Auth page',
                routes: [
                    {
                        name: 'auth',
                        title: 'Auth page',
                        path: '/auth',
                        isPublic: true,
                        navigateTo: "/auth/login"
                    },
                    {
                        name: 'login',
                        title: 'Login page',
                        component: Login,
                        path: '/auth/login',
                        isPublic: true,
                    },
                    {
                        name: 'register',
                        title: 'Register page',
                        component: Register,
                        path: '/auth/register',
                        isPublic: true,
                    }
                ]
            }
        ]
    },
    {
        layout: HomeLayout,
        routes: [
            {
                name: 'home',
                title: 'Home page',
                component: Home,
                path: '/'
            },
            {
                name: 'detail',
                title: 'Detail page',
                component: Detail,
                path: '/detail/:id'
            },

        ]
    }
];
export const Routes = renderRoutes(routes);
