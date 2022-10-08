import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import NavBar from '../components/UI/NavBar';
import { useSelector } from 'react-redux';
import { MainContainer } from './styles/ProtectedStyles';
import CustomSpinner from '../components/UI/CustomSpinner';

const ProtectedRoutes = () => {
    const { isAuthUser, isLoadingReload } = useSelector( (state) => state.user );
    
    return(
        isLoadingReload ? (
            <MainContainer> <CustomSpinner color='#742ff6' size={30} /> </MainContainer>
        ) : isAuthUser ? (
            <main >
                <NavBar />
                <div>
                    <Outlet />
                </div>
            </main>
        ) : <Navigate to={'/'} />
    )
}

export default ProtectedRoutes;