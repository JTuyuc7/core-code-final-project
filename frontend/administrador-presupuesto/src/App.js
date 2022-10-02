import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './utils/ProtectedRoutes.jsx'

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
          { /* Protected Routes once login */}
            <Route path='/' element={<ProtectedRoutes />} >
              <Route index path='/' exact element={<Home />} />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/create-account' element={<CreateAccount />} />
            <Route path='/confirm-account/:token' element={ <ConfirmAccount />} />

            <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App;