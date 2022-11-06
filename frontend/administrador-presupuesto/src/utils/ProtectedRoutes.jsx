import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import NavBar from '../components/UI/NavBar';
import { useSelector } from 'react-redux';
import { MainContainer, MainContentContainer, OutletContainer, PageContent } from './styles/ProtectedStyles';
import CustomSpinner from '../components/UI/CustomSpinner';

const ProtectedRoutes = () => {
    const { isAuthUser, isLoadingReload } = useSelector( (state) => state.user );
    //const isLoadingReload = false; // TODO change to the proper variable
    const isAuthUserD = true;

    return(
        /* isLoadingReload ? (
            <MainContainer> <CustomSpinner color='#742ff6' size={30} /> </MainContainer>
        ) : isAuthUser ? (
            <MainContentContainer >
                <NavBar />
                <OutletContainer>
                    <PageContent>
                        <Outlet />
                    </PageContent>
                </OutletContainer>
            </MainContentContainer>
        ) : <Navigate to={'/'} /> */
        isAuthUserD ? (
            <MainContentContainer >
                <NavBar />
                <OutletContainer>
                    <PageContent>
                        <Outlet />
                    </PageContent>
                </OutletContainer>
            </MainContentContainer>
        ) : <Navigate to={'/'} />
    ) 
}

export default ProtectedRoutes;