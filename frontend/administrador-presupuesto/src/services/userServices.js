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
            toast.success(result.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (error) {
            console.log(error, 'Unabe to set the request to the backed')
            toast.error(error.response.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
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
                toast.error(result.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }

            if( notificationType === 1){
                toast.success(result.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        } catch (error) {
            console.log(error, 'Unable to verify your account')
        }finally {
            thunkApi.dispatch(userActions.dispatchLoading(false))
        }
    }
)

/*

axios.get(‘route.com', { transformRequest: [(data, headers) => {
   delete headers.common.Authorization;

   return data 
}] })
*/