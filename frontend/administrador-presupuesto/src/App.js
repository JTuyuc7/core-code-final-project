import React, { useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './utils/ProtectedRoutes.jsx';
import PublicRoutes from './utils/PublicRoutes.jsx';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { isValidToken } from './services/userServices.js';
import 'react-toastify/dist/ReactToastify.css';

// Protected routes
import Home from './components/pages/ProtectedPages/Home.jsx';

// Public routes
import Login from './components/pages/PublicPages/Login';
import CreateAccount from './components/pages/PublicPages/CreateAccount.jsx';
import ConfirmAccount from './components/pages/PublicPages/ConfirmAccount.jsx';

import NotFound from './components/pages/PublicPages/NotFound.jsx';
import CustomSpinner from './components/UI/CustomSpinner.jsx';
import { MainContainer } from './styles/AppStyles.js';

const App = () => {
  const dispatch = useDispatch();
  const checkLocalstorageToken = async () => {
    const localToken = await localStorage.getItem('$userToken')
    if(localToken){
      dispatch(isValidToken(localToken))
    }
  }
  useEffect(() => {
    // TODO development mode token is stored
    checkLocalstorageToken()
  },[])

  return(
    <>
      <div >
        <Routes >

            { /* Protected Routes */}
            <Route path='/budget' element={<ProtectedRoutes />}>
              <Route index path='/budget' element={
                <Suspense
                  fallback={
                    <MainContainer> <CustomSpinner color='#742ff6' size={30} /> </MainContainer>
                  }
                >
                  <Home />
                </Suspense>
              } />

              {/*More routes below this line */}
            </Route>
            {/* Public Routes */}
            <Route path='/' element={<PublicRoutes />}>
                <Route index element={<Login />} />
                <Route path='/create-account' element={<CreateAccount />} />
                <Route path='/confirm-account/:token' element={ <ConfirmAccount />} />
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