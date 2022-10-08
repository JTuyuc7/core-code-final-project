import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '../features/userSlice';
import { axiosClient } from '../config/axios';
import { toast } from 'react-toastify';

// Create Account
export const createNewUser = createAsyncThunk(
    'create_new_user',
    async (data, thunkApi) => {
        try {
            thunkApi.dispatch(userActions.dispatchLoading(true))
            const result = await axiosClient.post('/api/create-account', data )
            toast.success(result.data.msg)
        } catch (error) {
            console.log(error, 'Unabe to set the request to the backed')
            toast.error(error.response.data.msg)
        }finally {
            //console.log('Close any session')
            thunkApi.dispatch(userActions.dispatchLoading(false))
            thunkApi.dispatch(userActions.clearTakenEmail())
        }
    }
)

export const validateTakenEmail = createAsyncThunk(
    'validate_taken_email',
    async (email, thunkApi) => {
        try {
            const result = await axiosClient.post('/api/create-account/check-email', email)
            thunkApi.dispatch(userActions.checkTakenEmail(result.data))
        } catch (error) {
            console.log(error, 'Unable to check the email')
        }
    }
)

export const confirmEmailAccount = createAsyncThunk(
    'validate_email_account',
    async (token, thunkApi) => {
        try {
            thunkApi.dispatch(userActions.dispatchLoading(true))
            const result = await axiosClient.get(`/api/confirm-account/${token}`);
            const notificationType = result.data.isValid;
            thunkApi.dispatch(userActions.confirmEmailAccount(result.data.isValid))
            if(notificationType === 0){
                toast.error(result.data.msg)
            }

            if( notificationType === 1){
                toast.success(result.data.msg)
            }
        } catch (error) {
            console.log(error, 'Unable to verify your account')
            toast.error('Something went wrong, try again later')
        }finally {
            thunkApi.dispatch(userActions.dispatchLoading(false))
        }
    }
)

// Login User
export const loginUserService = createAsyncThunk(
    'login_user',
    async (data, thunkApi) => {
        try {
            thunkApi.dispatch(userActions.dispatchLoading(true));
            const result = await axiosClient.post('/api/login', data);
            if(result.data.codeStatus === 2) {
                toast.warning(result.data.msg)
            }

            if(result.data.codeStatus === 1) {
                toast.success(result.data.msg, { // TODO mover a pagina principal?
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                })

                thunkApi.dispatch(userActions.storeUserInfo(result.data))

                // Save token on localStorage
                await localStorage.setItem('$userToken', result.data.token )
            }
        } catch (error) {
            console.log(error, 'unable to login to your account')
            toast.error('Something went wrong, try again later')
        }finally {
            thunkApi.dispatch(userActions.dispatchLoading(false));
        }
    }
)

export const isValidToken = createAsyncThunk(
    'validate_storage_token',
    async (token, thunkApi) => {
        try {
            thunkApi.dispatch(userActions.dispatchLoadingReload(true));
            const result = await axiosClient.get(`/api/validate/${token}`);
            //console.log(result.data.result.tokenExp, 'result from backend check token')// datos de tiempo
            // TODO refactor when token is expired
            //console.log(result.data, '*-*-*-*-*-**')
            /*
            const expiredTime = result.data.result.tokenExp * 1000;
            const timeNow = new Date(Date.now()).getTime();

            if( timeNow > expiredTime ){
                console.log('entra en validacion')
                thunkApi.dispatch(userActions.updateCredentialsReload({ isValid: false, token: '' }));
                await localStorage.removeItem('$userToken');
                toast.warning('Please log in again')
            } 
            */
            thunkApi.dispatch(userActions.updateCredentialsReload({ isValid: true, token: token, user: result.data.user }));
            toast.success(result.data.msg)
        } catch (error) {
            console.log(error.response.data, 'Unable to validate the token')
            toast.warning('Please log in again')
            thunkApi.dispatch(userActions.updateCredentialsReload({ isValid: false, token: '' }));
            await localStorage.removeItem('$userToken');
        }finally{
            setTimeout(() => {
                thunkApi.dispatch(userActions.dispatchLoadingReload(false))
            }, 900)
        }
    }
)

/*

axios.get(‘route.com', { transformRequest: [(data, headers) => {
   delete headers.common.Authorization;

   return data 
}] })
*/