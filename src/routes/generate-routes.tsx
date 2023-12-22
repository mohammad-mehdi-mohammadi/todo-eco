import flattenDeep from 'lodash/flattenDeep';
import {Navigate, Route, Routes as ReactRoutes} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import {Suspense} from 'react';

const generateFlattenRoutes = (routes) => {
    if (!routes) return [];
    return flattenDeep(routes.map(({routes: subRoutes, ...rest}) => [rest, generateFlattenRoutes(subRoutes)]));
}
export const renderRoutes = (mainRoutes) => {
    return ({isAuthorized}) => {
        const layouts = mainRoutes.map(({layout: Layout, routes}, index) => {
            const subRoutes = generateFlattenRoutes(routes);
            return (
                <Route key={index} element={<Layout/>}>
                    {subRoutes.map(({component: Component, path, name, isPublic, navigateTo}, index) => {
                        return (
                            <Route key={index}
                                   element={<ProtectedRoute isAuthorized={isAuthorized} isPublic={isPublic}/>}>
                                {Component && path && (<Route key={name} element={navigateTo && navigateTo.length ?
                                    <Navigate to={navigateTo}/> : <Suspense fallback={<>LOADING...</>}>
                                        <Component/>
                                    </Suspense>} path={path}/>)}
                            </Route>
                        )
                    })}
                </Route>
            )
        });
        return <ReactRoutes>{layouts}</ReactRoutes>
    };
}
