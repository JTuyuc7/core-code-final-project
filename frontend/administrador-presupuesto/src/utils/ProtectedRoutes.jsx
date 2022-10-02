import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import NavBar from '../components/UI/NavBar';

const ProtectedRoutes = () => {

    // Dummy State for authentication
    // TODO change the logig
    const [ isAuthDummy, setIsAuthDummy ] = useState(true);

    const onLogOout = () => {
        setIsAuthDummy(false)
    }

    

    console.log(isAuthDummy, 'estado')

    return(
        isAuthDummy ? (
            <main>
                <NavBar onlogoutTest={onLogOout} />
                <div>
                    <Outlet />
                </div>
            </main>
        ) : <Navigate to={'/login'} />
    )
}

export default ProtectedRoutes;