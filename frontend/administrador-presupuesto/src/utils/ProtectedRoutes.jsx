import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import NavBar from '../components/UI/NavBar';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {

    const { isAuthUser } = useSelector( (state) => state.user );
    const [ isAuthDummy, setIsAuthDummy ] = useState(false);

    const onLogOout = () => {
        setIsAuthDummy(false)
    }

    

    console.log(isAuthDummy, 'estado')

    return(
        isAuthUser ? (
            <main className='flex-1 bg-slate-900 h-40'>
                <NavBar onlogoutTest={onLogOout} />
                <div>
                    <Outlet />
                </div>
            </main>
        ) : <Navigate to={'/'} />
    )
}

export default ProtectedRoutes;