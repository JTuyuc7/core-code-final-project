import React from 'react'
import { Outlet } from 'react-router-dom';

const PublicRoutes = () => {

    console.log('aca para login')

    return(
        <main>
            <div>
                <Outlet />
            </div>
        </main>
    )
}

export default PublicRoutes;