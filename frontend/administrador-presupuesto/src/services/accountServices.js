import { createAsyncThunk } from '@reduxjs/toolkit';
import { accountActions } from '../features/accountsSlice';
import { axiosClient } from '../config/axios';
import { toast } from 'react-toastify';

const storageUsertoken = () => {
    const token = localStorage.getItem('$userToken');
    return token;
}

export const createNewAccount = createAsyncThunk(
    'create_budget_account',
    async (data, thunkApi) => {
        const token = storageUsertoken();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        thunkApi.dispatch(accountActions.dispatchLoadingCreateAccount(true));
        try {
            const result = await axiosClient.post(`/api/budget/create-account`,data, config);
            if (result.status === 200) {
                toast.success(result.data.msg);
                thunkApi.dispatch(accountActions.dispatchSuccessRequest(true));
            }
        } catch (error) {
            console.log(error, 'unable to create the account')
        } finally {
            setTimeout(() => {
                thunkApi.dispatch(accountActions.dispatchLoadingCreateAccount(false));
            },900)
        }
    }
)

export const getAllAccountTypes = createAsyncThunk(
    'get_all_account_types', 
    async (_, thunkApi) => {
        const token = storageUsertoken();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const result = await axiosClient.get(`api/budget/account-types`, config);
            if (result.status === 200) {
                thunkApi.dispatch(accountActions.dispatchGetAllAccountTypes(result.data.accounts));
            }
        } catch (error) {
            console.log(error, 'Unable to get all account types')
        }
    }
)

export const getAllMyAccounts = createAsyncThunk(
    'get_all_accounts',
    async (_, thunkApi) => {
        const token = storageUsertoken();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        // Dispatch loading state
        thunkApi.dispatch(accountActions.dispatchLoadingAccounts(true))
        try {
            const result = await axiosClient.get(`/api/budget/all-accounts`, config);
            if (result.status === 200) {
                thunkApi.dispatch(accountActions.dispatchAllUserAccounts(result.data.accounts))
            }
        } catch (error) {
            console.log(error, 'unable to get my accounts')
        } finally {
            thunkApi.dispatch(accountActions.dispatchLoadingAccounts(false));
        }
    }
)