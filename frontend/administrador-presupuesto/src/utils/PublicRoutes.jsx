import React from 'react'
import { Outlet } from 'react-router-dom';

const PublicRoutes = () => {

    return(
        <main>
            <div>
                <Outlet />
            </div>
        </main>
    )
}

export default PublicRoutes;