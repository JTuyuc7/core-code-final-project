import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './utils/ProtectedRoutes.jsx';
import PublicRoutes from './utils/PublicRoutes.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Protected routes
import Home from './components/pages/ProtectedPages/Home.jsx';

// Public routes
import Login from './components/pages/PublicPages/Login';
import CreateAccount from './components/pages/PublicPages/CreateAccount.jsx';
import ConfirmAccount from './components/pages/PublicPages/ConfirmAccount.jsx';

import NotFound from './components/pages/PublicPages/NotFound.jsx';


const App = () => {

  return(
    <>
      <div >
        <Routes >
            {/* Public Routes */}
            <Route path='/' element={<PublicRoutes />} >
              <Route index element={<Login />} />
              <Route path='/create-account' element={<CreateAccount />} />
              <Route path='/confirm-account/:token' element={ <ConfirmAccount />} />
            </Route>

            { /* Protected Routes */}
            <Route path='/budget' element={<ProtectedRoutes />} >
              <Route index path='/budget' exact element={<Home />} />
            </Route>

            <Route path='*' element={<NotFound />} />
        </Routes>

        <ToastContainer 
          position= "top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          progress={undefined}
        />
      </div>
    </>
  )
}

export default App;