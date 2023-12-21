import {renderRoutes} from "./generate-routes";
import AnonymousLayout from "../layouts/AnonymousLayout";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../views/Home";
import Detail from "../views/Detail";
import Auth from "../views/Auth";


export const routes = [
    {
        layout: AnonymousLayout,
        routes: [
            {
                name: 'auth',
                title: 'Auth page',
                component: Auth,
                path: '/auth',
                isPublic: true,
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
                path: '/detail'
            },

        ]
    }
];
export const Routes = renderRoutes(routes);
