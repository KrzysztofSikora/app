import React, {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {isSignIn} from "../services/AuthService";
export interface ProtectedRouteProps {
    children: ReactNode;
}

/**
 * Redirect to children component when user is not logged in.
 * @param children
 * @constructor
 */
const ProtectedRoute: React.FC<ProtectedRouteProps>  = ({children}) =>
    !isSignIn() ? <Navigate to="/login" replace /> : <>{children}</>

export default ProtectedRoute;