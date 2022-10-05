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
            console.log(result.data, 'insertado')
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
            console.log('Close any session')
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