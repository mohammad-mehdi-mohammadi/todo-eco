import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isPublic, isAuthorized }) => {
    return (isPublic && isAuthorized) ? <Navigate to='/' /> : (isPublic || isAuthorized) ? <Outlet /> : <Navigate to='/auth' />
}

export default ProtectedRoute;
